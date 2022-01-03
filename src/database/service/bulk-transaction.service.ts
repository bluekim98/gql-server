import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';

@Injectable()
export class BulkTracnsactionService {
    async bulkSave<E>(entityClass, entitys: E[]): Promise<E[]> {
        const connection = getConnection();
        const runner = connection.createQueryRunner();

        let result: any;
        await runner.startTransaction();
        try {
            result = await runner.manager.save(entityClass, entitys);
            await runner.commitTransaction();
            return result;
        } catch (error) {
            console.log(error);
            await runner.rollbackTransaction();
        } finally {
            await runner.release();
        }
    }
}
