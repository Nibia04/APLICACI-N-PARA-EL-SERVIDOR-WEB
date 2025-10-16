import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRoot() {
    return {
      message: '¡Bienvenido a la API de Marketplace! 🚀',
      version: '1.0.0',
      description: 'API REST para gestión de marketplace con emprendedores, productos y ventas',
      apiBase: '/api/v1',
      endpoints: {
        usuarios: '/api/v1/usuarios',
        emprendedores: '/api/v1/emprendedores',
        clientes: '/api/v1/clientes',
        categorias: '/api/v1/categorias',
        productos: '/api/v1/productos',
        tarjetasVirtuales: '/api/v1/tarjetas-virtuales',
        carritosCompra: '/api/v1/carritos-compra',
        detallesCarro: '/api/v1/detalles-carro',
        ordenes: '/api/v1/ordenes',
        detallesOrden: '/api/v1/detalles-orden',
        pagos: '/api/v1/pagos',
        historialCompras: '/api/v1/historial-compras',
        favoritos: '/api/v1/favoritos',
      },
      documentation: {
        readme: 'Ver README.md en el repositorio',
        examples: 'Ver API_EXAMPLES.md para ejemplos de uso',
      },
      totalEndpoints: 67,
      status: 'online',
      timestamp: new Date().toISOString(),
    };
  }
}

@Controller('api/v1')
export class ApiInfoController {
  @Get()
  getApiInfo() {
    return {
      message: 'API REST - Marketplace v1.0',
      description: 'API para gestión de marketplace con emprendedores, productos y ventas',
      availableEndpoints: [
        { resource: 'usuarios', path: '/api/v1/usuarios', methods: ['GET', 'POST', 'PATCH', 'DELETE'] },
        { resource: 'emprendedores', path: '/api/v1/emprendedores', methods: ['GET', 'POST', 'PATCH', 'DELETE'] },
        { resource: 'clientes', path: '/api/v1/clientes', methods: ['GET', 'POST', 'PATCH', 'DELETE'] },
        { resource: 'categorias', path: '/api/v1/categorias', methods: ['GET', 'POST', 'PATCH', 'DELETE'] },
        { resource: 'productos', path: '/api/v1/productos', methods: ['GET', 'POST', 'PATCH', 'DELETE'] },
        { resource: 'tarjetasVirtuales', path: '/api/v1/tarjetas-virtuales', methods: ['GET', 'POST', 'PATCH', 'DELETE'] },
        { resource: 'carritosCompra', path: '/api/v1/carritos-compra', methods: ['GET', 'POST', 'PATCH', 'DELETE'] },
        { resource: 'detallesCarro', path: '/api/v1/detalles-carro', methods: ['GET', 'POST', 'PATCH', 'DELETE'] },
        { resource: 'ordenes', path: '/api/v1/ordenes', methods: ['GET', 'POST', 'PATCH', 'DELETE'] },
        { resource: 'detallesOrden', path: '/api/v1/detalles-orden', methods: ['GET', 'POST', 'PATCH', 'DELETE'] },
        { resource: 'pagos', path: '/api/v1/pagos', methods: ['GET', 'POST', 'PATCH', 'DELETE'] },
        { resource: 'historialCompras', path: '/api/v1/historial-compras', methods: ['GET', 'POST', 'PATCH', 'DELETE'] },
        { resource: 'favoritos', path: '/api/v1/favoritos', methods: ['GET', 'POST', 'PATCH', 'DELETE'] },
      ],
      totalEndpoints: 65,
      version: '1.0.0',
      timestamp: new Date().toISOString(),
    };
  }
}
