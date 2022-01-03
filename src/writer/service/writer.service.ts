import { Inject, Injectable } from '@nestjs/common';
import { Writer } from '@src/database/entity/writer.entity';
import { FindWriterInput } from '@src/graphql';
import { createWhere } from '@src/util/query-builder';
import { Repository } from 'typeorm';

export enum WriterRelation {
    books = 'books',
}

export interface WriterJoinOption {
    property: string;
    where?: Record<string, any>;
}

export class CreateWriterDto {
    readonly name: string;
}

@Injectable()
export class WriterService {
    constructor(
        @Inject('WRITER_REPOSITORY')
        private readonly writerRepository: Repository<Writer>,
    ) {}

    async getMany(joinOptions: WriterJoinOption[]) {
        const qb = this.join(joinOptions);
        return await qb.getMany();
    }

    join(joinOptions: WriterJoinOption[]) {
        const relationOptions = this.createJoinOption(joinOptions);

        const qb = this.writerRepository.createQueryBuilder();
        for (const option of relationOptions) {
            qb.innerJoinAndSelect(
                option.property,
                option.alias,
                option.where.condition,
                option.where.param,
            );
        }

        return qb;
    }

    createJoinOption(joinOptions: WriterJoinOption[]) {
        return joinOptions.map((option) => {
            const where = createWhere(option.where, option.property);
            return {
                property: `${this.tableName}.${option.property}`,
                alias: option.property,
                where: where,
            };
        });
    }

    get tableName(): string {
        return this.writerRepository.metadata.name;
    }

    async save(dto: CreateWriterDto) {
        return await this.writerRepository.save({ ...dto });
    }

    async findOne(id: number) {
        return await this.writerRepository.findOne({ id });
    }

    async find(input: FindWriterInput) {
        const where = createWhere(input.where, this.tableName);
        const alias = Object.keys(input.some);

        const joinOptions = alias.map((alias) => ({
            property: alias,
            where: input.some[alias],
        }));

        const qb = this.join(joinOptions);
        const data = await qb.where(where.condition, where.param).getMany();

        return data;
    }
}
