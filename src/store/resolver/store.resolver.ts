import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateStoreInput, RegisterBookInput } from '@src/graphql';
import { StoreService } from '../service/store.service';

@Resolver()
export class StoreResolver {
    constructor(private readonly storeService: StoreService) {}

    @Query('stores')
    async stores(@Args() args: any) {
        return [];
    }

    @Mutation('createStroe')
    async createStroe(@Args('input') input: CreateStoreInput) {
        return await this.storeService.save({ ...input });
    }

    @Mutation('registerBook')
    async registerBook(@Args('input') input: RegisterBookInput) {
        return await this.storeService.registerBook({ ...input });
    }
}
