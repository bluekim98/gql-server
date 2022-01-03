import { Writer } from '@src/database/entity/writer.entity';
import { DataSource } from 'apollo-datasource';
import DataLoader from 'dataloader';

import _ from 'lodash';
import { WriterService } from './writer.service';

export interface FindWriterKey {
    where?: any;
    some?: any;
}

export class WriterDataSource extends DataSource {
    constructor(private readonly writerService: WriterService) {
        super();
    }

    private readonly loader = new DataLoader<FindWriterKey, Writer>(
        async (keys: FindWriterKey[]) => {
            console.log(keys);

            return undefined;
        },
    );

    async find(key: FindWriterKey) {
        const data = await this.loader.load(key);
        console.log({ data });

        return data;
    }
}
