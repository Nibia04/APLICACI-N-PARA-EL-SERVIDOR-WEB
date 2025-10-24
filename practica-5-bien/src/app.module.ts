import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosModule } from './productos/productos.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { OrdenesModule } from './ordenes/ordenes.module';
import { CategoriasModule } from './categorias/categorias.module';
import { PagosModule } from './pagos/pagos.module';
import { TrajetasVirtualesModule } from './trajetas-virtuales/trajetas-virtuales.module';
import { DetallesCarritoModule } from './detalles-carrito/detalles-carrito.module';
import { DellatesOrdenModule } from './dellates-orden/dellates-orden.module';
import { EmprendedoresModule } from './emprendedores/emprendedores.module';
import { CarritoDeComprasModule } from './carrito-de-compras/carrito-de-compras.module';
import { HistorialComprasModule } from './historial-compras/historial-compras.module';
import { FavoritosModule } from './favoritos/favoritos.module';
import { GraphQLModule } from '@nestjs/graphql';
import {ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { HttpModule } from '@nestjs/axios';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ClientesModule } from './clientes/clientes.module';

@Module({
imports: [
    HttpModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      autoSchemaFile: true,
    }),

    EmprendedoresModule, ProductosModule, ClientesModule, UsuariosModule, OrdenesModule, CategoriasModule, PagosModule, TrajetasVirtualesModule, DetallesCarritoModule, DellatesOrdenModule, CarritoDeComprasModule, HistorialComprasModule, FavoritosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
