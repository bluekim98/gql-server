import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { BookStoreRelation } from './book-store-relation.entity';

@Entity({
    name: 'store',
})
export class Store {
    @PrimaryGeneratedColumn('increment', { type: 'int', name: 'id' })
    readonly id: number;

    @Column({ type: 'varchar', name: 'name' })
    readonly name: string;

    @OneToMany(
        () => BookStoreRelation,
        (bookStoreRelations) => bookStoreRelations.store,
    )
    @JoinColumn({ name: 'id', referencedColumnName: 'storeId' })
    readonly bookStoreRelations: BookStoreRelation[];
}
