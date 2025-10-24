import { InputType, Field, Int } from '@nestjs/graphql';

@InputType({ description: 'Parámetros de paginación para listas' })
export class PaginationInput {
  @Field(() => Int, { 
    nullable: true, 
    defaultValue: 10,
    description: 'Número de registros a retornar por página (máximo 100)' 
  })
  limit?: number;

  @Field(() => Int, { 
    nullable: true, 
    defaultValue: 0,
    description: 'Número de registros a saltar (offset)' 
  })
  offset?: number;
}
