import { Module } from '@nestjs/common';
import { AppConfigModule } from '@src/app-config/app-config.module';
import { BaseService } from './service/base.service';
import { BulkTracnsactionService } from './service/bulk-transaction.service';
import { databaseProviders } from './service/database.providers';

@Module({
    imports: [AppConfigModule],
    providers: [...databaseProviders, BulkTracnsactionService],
    exports: [...databaseProviders, BulkTracnsactionService],
})
export class DatabaseModule {}
