import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductosService } from './productos.service';
import { Producto } from './entities/producto.entity';
import { CreateProductoInput } from './dto/create-producto.input';
import { UpdateProductoInput } from './dto/update-producto.input';
import { PaginationInput } from '../common/dto/pagination.input';
import { FilterProductosInput } from '../common/dto/filter-productos.input';

@Resolver(() => Producto)
export class ProductosResolver {
  constructor(private readonly productosService: ProductosService) {}

  @Mutation(() => Producto, { description: 'Crear un nuevo producto' })
  createProducto(@Args('createProductoInput') createProductoInput: CreateProductoInput) {
    return this.productosService.create(createProductoInput);
  }

  @Query(() => [Producto], { 
    name: 'productos',
    description: 'Obtener lista de todos los productos. Opcionalmente se pueden aplicar filtros de búsqueda.'
  })
  findAll(
    @Args('pagination', { nullable: true, description: 'Parámetros de paginación' }) pagination?: PaginationInput,
    @Args('filters', { nullable: true, description: 'Filtros de búsqueda' }) filters?: FilterProductosInput,
  ) {
    return this.productosService.findAll();
  }

  @Query(() => Producto, { 
    name: 'producto',
    description: 'Buscar un producto específico por su ID'
  })
  findOne(@Args('id', { type: () => Int, description: 'ID del producto' }) id: number) {
    return this.productosService.findOne(id);
  }

  @Mutation(() => Producto, { description: 'Actualizar un producto existente' })
  updateProducto(@Args('updateProductoInput') updateProductoInput: UpdateProductoInput) {
    return this.productosService.update(updateProductoInput.id, updateProductoInput);
  }

  @Mutation(() => Producto, { description: 'Eliminar un producto' })
  removeProducto(@Args('id', { type: () => Int, description: 'ID del producto a eliminar' }) id: number) {
    return this.productosService.remove(id);
  }
}
