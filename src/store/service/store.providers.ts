import { BookStoreRelation } from '@src/database/entity/book-store-relation.entity';
import { Store } from '@src/database/entity/store.entity';
import { Connection } from 'typeorm';

export const storeProviders = [
    {
        provide: 'STORE_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Store),
        inject: ['DATABASE_CONNECTION'],
    },
    {
        provide: 'BOOK_STORE_RELATION_REPOSITORY',
        useFactory: (connection: Connection) =>
            connection.getRepository(BookStoreRelation),
        inject: ['DATABASE_CONNECTION'],
    },
];
