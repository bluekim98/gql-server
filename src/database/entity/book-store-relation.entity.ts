import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Book } from './book.entity';
import { Store } from './store.entity';

@Entity({
    name: 'book_store_relation',
})
export class BookStoreRelation {
    @PrimaryGeneratedColumn('increment', { type: 'int', name: 'id' })
    readonly id: number;

    @Column({ type: 'int', name: 'store_id' })
    readonly storeId: number;

    @Column({ type: 'int', name: 'book_id' })
    readonly bookId: number;

    @ManyToOne(() => Book, (book) => book.bookStoreRelations)
    @JoinColumn({ name: 'book_id', referencedColumnName: 'id' })
    readonly book: Book;

    @ManyToOne(() => Store, (store) => store.bookStoreRelations)
    @JoinColumn({ name: 'store_id', referencedColumnName: 'id' })
    readonly store: Store;
}
