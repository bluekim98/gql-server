import { Module } from '@nestjs/common';
import { DatabaseModule } from '@src/database/database.module';
import { BookResolver } from './resolver/book.resolver';
import { bookProviders } from './service/book.providers';
import { BookService } from './service/book.service';

@Module({
    imports: [DatabaseModule],
    providers: [BookResolver, BookService, ...bookProviders],
    exports: [BookService],
})
export class BookModule {}
