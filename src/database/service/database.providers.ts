import { ConfigService } from '@nestjs/config';
import { createConnection } from 'typeorm';
import { BookStoreRelation } from '../entity/book-store-relation.entity';
import { Book } from '../entity/book.entity';
import { Store } from '../entity/store.entity';
import { Writer } from '../entity/writer.entity';

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async (configService: ConfigService) =>
            await createConnection({
                type: 'mysql',
                host: configService.get('MYSQL_HOST'),
                port: configService.get<number>('MYSQL_PORT'),
                username: configService.get('MYSQL_USER'),
                password: configService.get('MYSQL_PASSWORD'),
                database: configService.get('MYSQL_DATABASE'),
                maxQueryExecutionTime: 500,
                connectTimeout: 100,
                extra: {
                    connectionLimit: 1,
                },
                entities: [Writer, Book, Store, BookStoreRelation],
                synchronize: false,
                // timezone: 'utc',
                logging: ['query', 'error'],
            }),
        inject: [ConfigService],
    },
];
