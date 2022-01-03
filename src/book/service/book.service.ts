import { Inject, Injectable } from '@nestjs/common';
import { Book } from '@src/database/entity/book.entity';
import { BaseService } from '@src/database/service/base.service';
import { createWhere } from '@src/util/query-builder';
import { Repository } from 'typeorm';
import { FindKey } from './book.datasource';

export class CreateBookDto {
    readonly title: string;
    readonly writerId: number;
}

@Injectable()
export class BookService extends BaseService<Book> {
    constructor(
        @Inject('BOOK_REPOSITORY')
        private readonly bookRepository: Repository<Book>,
    ) {
        super(bookRepository);
    }

    get tableName(): string {
        return this.bookRepository.metadata.name;
    }

    async save(dto: CreateBookDto) {
        return await this.bookRepository.save({ ...dto });
    }

    async find(keys: FindKey[]) {
        const some = keys[0].some ?? {};
        const where = keys[0].where ?? {};

        const alias = Object.keys(some);

        const joinOptions = alias.map((alias) => ({
            property: alias,
            where: some[alias],
        }));

        const writerIds = keys.map((key) => key.id);
        const wheres = createWhere(
            { writerId__in: [writerIds], ...where },
            this.tableName,
        );

        const qb = this.innerJoinAndSelect(joinOptions);
        const data = await qb.where(wheres.condition, wheres.param).getMany();

        return data;
    }

    async findById(id: number) {
        return await this.bookRepository.findOne({ id });
    }
}
