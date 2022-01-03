
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class BookStoreRelationWhere {
    id?: Nullable<string>;
    id__in?: Nullable<Nullable<string>[]>;
    bookId?: Nullable<number>;
    bookId__in?: Nullable<Nullable<number>[]>;
    storeId?: Nullable<number>;
    storeId__in?: Nullable<Nullable<number>[]>;
}

export class CreateBookInput {
    title: string;
    writerId: number;
}

export class CreateStoreInput {
    name: string;
}

export class CreateWriterInput {
    name: string;
}

export class FindBookInput {
    where?: Nullable<FindBookWhere>;
    some?: Nullable<FindBookSome>;
}

export class FindBookSome {
    bookStoreRelations?: Nullable<BookStoreRelationWhere>;
}

export class FindBookWhere {
    id?: Nullable<string>;
    id__in?: Nullable<Nullable<string>[]>;
    title?: Nullable<string>;
    writerId?: Nullable<number>;
}

export class FindWriterInput {
    where?: Nullable<FindWriterWhere>;
    some?: Nullable<FindWriterSome>;
}

export class FindWriterSome {
    books?: Nullable<FindBookWhere>;
}

export class FindWriterWhere {
    id?: Nullable<string>;
    id__in?: Nullable<Nullable<string>[]>;
    name?: Nullable<string>;
}

export class RegisterBookInput {
    storeId: number;
    bookId: number;
}

export class Book {
    id?: Nullable<string>;
    title?: Nullable<string>;
    writerId?: Nullable<number>;
    writer?: Nullable<Writer>;
    bookStoreRelations?: Nullable<Nullable<BookStoreRelation>[]>;
}

export class BookStoreRelation {
    id?: Nullable<string>;
    bookId?: Nullable<number>;
    storeId?: Nullable<number>;
    book?: Nullable<Book>;
    store?: Nullable<Store>;
}

export abstract class IMutation {
    abstract createBook(input?: Nullable<CreateBookInput>): Nullable<Book> | Promise<Nullable<Book>>;

    abstract createStroe(input?: Nullable<CreateStoreInput>): Nullable<Store> | Promise<Nullable<Store>>;

    abstract registerBook(input?: Nullable<RegisterBookInput>): Nullable<BookStoreRelation> | Promise<Nullable<BookStoreRelation>>;

    abstract createWriter(input?: Nullable<CreateWriterInput>): Nullable<Writer> | Promise<Nullable<Writer>>;
}

export abstract class IQuery {
    abstract books(): Nullable<Nullable<Book>[]> | Promise<Nullable<Nullable<Book>[]>>;

    abstract stores(): Nullable<Nullable<Store>[]> | Promise<Nullable<Nullable<Store>[]>>;

    abstract writers(input?: Nullable<FindWriterInput>): Nullable<Nullable<Writer>[]> | Promise<Nullable<Nullable<Writer>[]>>;
}

export class Store {
    id?: Nullable<string>;
    name?: Nullable<string>;
    bookStoreRelations?: Nullable<Nullable<BookStoreRelation>[]>;
}

export class Writer {
    id?: Nullable<string>;
    name?: Nullable<string>;
    books?: Nullable<Nullable<Book>[]>;
}

type Nullable<T> = T | null;
