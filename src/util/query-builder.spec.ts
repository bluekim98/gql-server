import { createWhere } from './query-builder';

describe('query-builder test', () => {
    it('createWhere', () => {
        const where = {
            id__in: [1, 2],
            title: 'test',
        };
        const { condition, param } = createWhere(where, 'books');

        expect(condition).toBe(
            'books.id in (:id_0) and books.title = :title_1',
        );
        expect(param['title_1']).toBe('test');
    });
});
