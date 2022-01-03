import { Module } from '@nestjs/common';
import { AppConfigModule } from './app-config/app-config.module';
import { DatabaseModule } from './database/database.module';
import { GqlModule } from './gql/gql.module';
import { WriterModule } from './writer/writer.module';
import { BookModule } from './book/book.module';
import { StoreModule } from './store/store.module';

@Module({
    imports: [
        GqlModule,
        AppConfigModule,
        DatabaseModule,
        WriterModule,
        BookModule,
        StoreModule,
    ],
})
export class AppModule {}
