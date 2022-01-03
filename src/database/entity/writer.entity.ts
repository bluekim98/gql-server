import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Book } from './book.entity';

@Entity({
    name: 'writer',
})
export class Writer {
    @PrimaryGeneratedColumn('increment', { type: 'int', name: 'id' })
    readonly id: number;

    @Column({ type: 'varchar', name: 'name' })
    readonly name: string;

    @OneToMany(() => Book, (book) => book.Writer)
    @JoinColumn({ name: 'id', referencedColumnName: 'writerId' })
    readonly books: Book[];
}
