import { Injectable } from '@nestjs/common';
import { createWhere } from '@src/util/query-builder';
import { Repository } from 'typeorm';
import DataLoader from 'dataloader';
import _ from 'lodash';

export interface LoadKey {
    parentId: number;
    iteratee: string;
    where?: any;
    some?: any;
}

export interface JoinTarget {
    property: string;
    where?: Record<string, any>;
}

@Injectable()
export abstract class BaseService<E> {
    protected readonly loader: DataLoader<LoadKey, E[]>;

    constructor(protected readonly repository: Repository<E>) {
        this.loader = new DataLoader<LoadKey, E[]>(async (keys: LoadKey[]) => {
            const allItems = await this.batch(keys);

            const items = _.groupBy(allItems, keys[0].iteratee);
            const result = keys.map((key) => items[key.parentId]);

            return result;
        });
    }

    async batch(keys: LoadKey[]): Promise<E[]> {
        const some = keys[0].some ?? {};
        const where = keys[0].where ?? {};

        const aliases = Object.keys(some);
        const joinOptions = aliases.map((alias) => ({
            property: alias,
            where: some[alias],
        }));
        const qb = this.innerJoinAndSelect(joinOptions);

        const parentProperty = `${keys[0].iteratee}__in`;
        const parentIds = keys.map((key) => key.parentId);
        const wheres = createWhere(
            { [parentProperty]: parentIds, ...where },
            this.tableName,
        );
        return await qb.where(wheres.condition, wheres.param).getMany();
    }

    // abstract batch(keys: LoadKey[]): Promise<E[]>;

    async load(key: LoadKey) {
        return await this.loader.load(key);
    }

    get tableName(): string {
        return this.repository.metadata.name;
    }

    innerJoinAndSelect(joinTargets: JoinTarget[]) {
        const joinOptions = this.createJoinOption(joinTargets);

        const qb = this.repository.createQueryBuilder();
        for (const option of joinOptions) {
            qb.innerJoinAndSelect(
                option.property,
                option.alias,
                option.where.condition,
                option.where.param,
            );
        }

        return qb;
    }

    createJoinOption(joinTargets: JoinTarget[]) {
        return joinTargets.map((option) => {
            const where = createWhere(option.where, option.property);
            return {
                property: `${this.tableName}.${option.property}`,
                alias: option.property,
                where: where,
            };
        });
    }
}
