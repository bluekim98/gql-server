import { Module } from '@nestjs/common';
import { BookModule } from '@src/book/book.module';
import { DatabaseModule } from '@src/database/database.module';
import { StoreResolver } from './resolver/store.resolver';
import { storeProviders } from './service/store.providers';
import { StoreService } from './service/store.service';

@Module({
    imports: [DatabaseModule, BookModule],
    providers: [StoreService, StoreResolver, ...storeProviders],
})
export class StoreModule {}
