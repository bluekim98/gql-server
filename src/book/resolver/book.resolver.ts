import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateBookInput } from '@src/graphql';
import { BookService } from '../service/book.service';

@Resolver('Book')
export class BookResolver {
    constructor(private readonly bookService: BookService) {}

    @Query('books')
    async books(@Args() args: any, @Info() info: any) {
        console.log({ args, info });
    }

    @Mutation('createBook')
    async createBook(@Args('input') input: CreateBookInput) {
        return await this.bookService.save({ ...input });
    }
}
