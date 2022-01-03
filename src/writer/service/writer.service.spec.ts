import { Test, TestingModule } from '@nestjs/testing';
import { WriterModule } from '../writer.module';
import {
    WriterJoinOption,
    WriterRelation,
    WriterService,
} from './writer.service';

describe('WriterService', () => {
    let writerService: WriterService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [WriterModule],
        }).compile();

        writerService = module.get<WriterService>(WriterService);
    });

    it('should be defined', () => {
        expect(writerService).toBeDefined();
    });

    describe('join test', () => {
        it('join', async () => {
            const where = {
                title: 'test',
            };
            const relations: WriterJoinOption[] = [
                { property: WriterRelation.books, where },
            ];
            writerService.join(relations);
        });

        it('getMany', async () => {
            const where = {
                title: 'test',
            };
            const relations: WriterJoinOption[] = [
                { property: WriterRelation.books, where },
            ];
            const datas = await writerService.getMany(relations);
            expect(datas).toBeDefined();
        });
    });
});
