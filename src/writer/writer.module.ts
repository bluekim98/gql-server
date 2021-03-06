import { Module } from '@nestjs/common';
import { BookModule } from '@src/book/book.module';
import { DatabaseModule } from '@src/database/database.module';
import { WriterResolver } from './resolver/writer.resolver';
import { writerProviders } from './service/writer.providers';
import { WriterService } from './service/writer.service';

@Module({
    imports: [DatabaseModule, BookModule],
    providers: [WriterService, ...writerProviders, WriterResolver],
    exports: [WriterService],
})
export class WriterModule {}
