import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController, ApiInfoController } from './app.controller';
import { EmprendedoresModule } from './emprendedores/emprendedores.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ClientesModule } from './clientes/clientes.module';
import { CategoriasModule } from './categorias/categorias.module';
import { ProductosModule } from './productos/productos.module';
import { TarjetasVirtualesModule } from './tarjetas-virtuales/tarjetas-virtuales.module';
import { CarritosCompraModule } from './carritos-compra/carritos-compra.module';
import { DetallesCarroModule } from './detalles-carro/detalles-carro.module';
import { OrdenesModule } from './ordenes/ordenes.module';
import { DetallesOrdenModule } from './detalles-orden/detalles-orden.module';
import { PagosModule } from './pagos/pagos.module';
import { HistorialComprasModule } from './historial-compras/historial-compras.module';
import { FavoritosModule } from './favoritos/favoritos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'marketplace.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Solo para desarrollo
      logging: true, // Para debug
    }),
    UsuariosModule,
    EmprendedoresModule,
    ClientesModule,
    CategoriasModule,
    ProductosModule,
    TarjetasVirtualesModule,
    CarritosCompraModule,
    DetallesCarroModule,
    OrdenesModule,
    DetallesOrdenModule,
    PagosModule,
    HistorialComprasModule,
    FavoritosModule,
  ],
  controllers: [AppController, ApiInfoController],
  providers: [],
})
export class AppModule {}
