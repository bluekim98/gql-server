import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { BookStoreRelation } from './book-store-relation.entity';
import { Writer } from './writer.entity';

@Entity({
    name: 'book',
})
export class Book {
    @PrimaryGeneratedColumn('increment', { type: 'int', name: 'id' })
    readonly id: number;

    @Column({ type: 'varchar', name: 'title' })
    readonly title: string;

    @Column({ type: 'int', name: 'writer_id' })
    readonly writerId: number;

    @ManyToOne(() => Writer, (writer) => writer.books)
    @JoinColumn({ name: 'writer_id', referencedColumnName: 'id' })
    readonly Writer: Writer;

    @OneToMany(
        () => BookStoreRelation,
        (bookStoreRelations) => bookStoreRelations.book,
    )
    @JoinColumn({ name: 'id', referencedColumnName: 'bookId' })
    readonly bookStoreRelations: BookStoreRelation[];
}
