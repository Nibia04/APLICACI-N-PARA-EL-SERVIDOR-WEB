import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FavoritosService } from './favoritos.service';
import { Favorito } from './entities/favorito.entity';
import { CreateFavoritoInput } from './dto/create-favorito.input';
import { UpdateFavoritoInput } from './dto/update-favorito.input';

@Resolver(() => Favorito)
export class FavoritosResolver {
  constructor(private readonly favoritosService: FavoritosService) {}

  @Mutation(() => Favorito)
  createFavorito(@Args('createFavoritoInput') createFavoritoInput: CreateFavoritoInput) {
    return this.favoritosService.create(createFavoritoInput);
  }

  @Query(() => [Favorito], { name: 'favoritos' })
  findAll() {
    return this.favoritosService.findAll();
  }

  @Query(() => Favorito, { name: 'favorito' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.favoritosService.findOne(id);
  }

  @Mutation(() => Favorito)
  updateFavorito(@Args('updateFavoritoInput') updateFavoritoInput: UpdateFavoritoInput) {
    return this.favoritosService.update(updateFavoritoInput.id, updateFavoritoInput);
  }

  @Mutation(() => Favorito)
  removeFavorito(@Args('id', { type: () => Int }) id: number) {
    return this.favoritosService.remove(id);
  }
}
