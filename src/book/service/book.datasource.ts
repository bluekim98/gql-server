import { Book } from '@src/database/entity/book.entity';
import { DataSource } from 'apollo-datasource';
import DataLoader from 'dataloader';

import _ from 'lodash';
import { BookService } from './book.service';

export interface FindKey {
    id: number;
    where?: any;
    some?: any;
}

export abstract class BookDataSource extends DataSource {
    constructor(private readonly bookService: BookService) {
        super();
    }

    private readonly loader = new DataLoader<FindKey, Book[]>(
        async (keys: FindKey[]) => {
            const allItems = await this.bookService.find(keys);

            const result = [];
            for (const key of keys) {
                const items = allItems.filter(
                    (item) => item.writerId === key.id,
                );
                result.push(items);
            }

            return result;
        },
    );

    async find(key: FindKey) {
        const data = await this.loader.load(key);

        return data;
    }
}
