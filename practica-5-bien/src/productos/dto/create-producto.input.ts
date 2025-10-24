import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateProductoInput {
  @Field()
  nombre: string;

  @Field({ nullable: true })
  descripcion?: string;

  @Field(() => Float)
  precio: number;

  @Field(() => Int, { defaultValue: 0 })
  stock?: number;

  @Field(() => Float, { defaultValue: 0 })
  rating?: number;

  @Field(() => Boolean, { defaultValue: true })
  disponible?: boolean;

  @Field({ nullable: true })
  imagen?: string;

  @Field(() => Int)
  categoriaId: number;

  @Field(() => Int)
  emprendedorId: number;
}
