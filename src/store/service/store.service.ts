import { Inject, Injectable } from '@nestjs/common';
import { BookService } from '@src/book/service/book.service';
import { BookStoreRelation } from '@src/database/entity/book-store-relation.entity';
import { Store } from '@src/database/entity/store.entity';
import { Repository } from 'typeorm';

export class CreateStoreDto {
    readonly name: string;
}

export class RegisterBookDto {
    storeId: number;
    bookId: number;
}

@Injectable()
export class StoreService {
    constructor(
        @Inject('STORE_REPOSITORY')
        protected readonly storeRepository: Repository<Store>,
        @Inject('BOOK_STORE_RELATION_REPOSITORY')
        protected readonly bookStoreRelationRepository: Repository<BookStoreRelation>,
        private readonly bookService: BookService,
    ) {}

    async save(dto: CreateStoreDto) {
        return await this.storeRepository.save({ ...dto });
    }

    async registerBook({ storeId, bookId }: RegisterBookDto) {
        const store = await this.storeRepository.findOne({ id: storeId });
        const book = await this.bookService.findById(bookId);
        return await this.bookStoreRelationRepository.save({
            storeId: store.id,
            bookId: book.id,
        });
    }
}
