import { Injectable } from '@nestjs/common';
import { createWhere } from '@src/util/query-builder';
import { Repository } from 'typeorm';
import DataLoader from 'dataloader';

export interface LoadKey {
    parentId: number;
    where?: any;
    some?: any;
}

export interface JoinTarget {
    property: string;
    where?: Record<string, any>;
}

@Injectable()
export class BaseService<E> {
    private readonly loader: DataLoader<LoadKey, E[]>;

    constructor(protected readonly repository: Repository<E>) {
        this.loader = new DataLoader<LoadKey, E[]>(async (keys: LoadKey[]) => {
            // const allItems = await this.load();

            const result = [];
            // for (const key of keys) {
            //     const items = allItems.filter(
            //         (item) => item.writerId === key.id,
            //     );
            //     result.push(items);
            // }

            return result;
        });
    }

    // load(): Promise<E[]>

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
