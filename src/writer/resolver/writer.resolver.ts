import {
    Args,
    Context,
    Info,
    Mutation,
    Parent,
    Query,
    ResolveField,
    Resolver,
} from '@nestjs/graphql';
import { BookDataSource, FindKey } from '@src/book/service/book.datasource';
import { CreateWriterInput, FindWriterInput, Writer } from '@src/graphql';
import { WriterService } from '../service/writer.service';

@Resolver('Writer')
export class WriterResolver {
    constructor(private readonly writerService: WriterService) {}

    @Query('writers')
    async writers(@Args('input') input: FindWriterInput) {
        const writers = await this.writerService.find(input);
        return writers;
    }

    @ResolveField('books')
    async books(
        @Parent() parent: Writer,
        @Args('input') input: FindWriterInput,
        @Info() info: any,
        @Context('dataSources')
        { bookDataSource }: { bookDataSource: BookDataSource },
    ) {
        const key: FindKey = {
            id: Number(parent.id),
            where: input?.where,
            some: input?.some,
        };
        const books = await bookDataSource.find(key);
        return books;
    }

    @Mutation('createWriter')
    async createWriter(@Args('input') input: CreateWriterInput) {
        return await this.writerService.save({ ...input });
    }
}
