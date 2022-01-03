import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { BookModule } from '@src/book/book.module';
import { BookDataSource } from '@src/book/service/book.datasource';
import { BookService } from '@src/book/service/book.service';
import { WriterDataSource } from '@src/writer/service/writer.datasource';
import { WriterService } from '@src/writer/service/writer.service';
import { WriterModule } from '@src/writer/writer.module';
import { join } from 'path';

@Module({
    imports: [
        GraphQLModule.forRootAsync({
            // imports: [WriterModule, BookModule],
            // inject: [WriterService, BookService],
            useFactory: () =>
                // writerService: WriterService,
                // bookService: BookService,
                {
                    return {
                        typePaths: ['./**/*.graphql'],
                        definitions: {
                            path: join(process.cwd(), 'src/graphql.ts'),
                            outputAs: 'class',
                        },
                        playground: true,
                        // dataSources: () => ({
                        //     writerDataSource: new WriterDataSource(writerService),
                        //     bookDataSource: new BookDataSource(bookService),
                        // }),
                    };
                },
        }),
    ],
})
export class GqlModule {}
