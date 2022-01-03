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
import { BookService } from '@src/book/service/book.service';
import { LoadKey } from '@src/database/service/base.service';
import { CreateWriterInput, FindWriterInput, Writer } from '@src/graphql';
import { WriterService } from '../service/writer.service';

@Resolver('Writer')
export class WriterResolver {
    constructor(
        private readonly writerService: WriterService,
        private readonly bookService: BookService,
    ) {}

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
        // @Context('dataSources')
        // { bookDataSource }: { bookDataSource: BookDataSource },
    ) {
        const key: LoadKey = {
            parentId: Number(parent.id),
            iteratee: 'writerId',
            where: input?.where,
            some: input?.some,
        };

        return await this.bookService.load(key);
    }

    @Mutation('createWriter')
    async createWriter(@Args('input') input: CreateWriterInput) {
        return await this.writerService.save({ ...input });
    }
}
