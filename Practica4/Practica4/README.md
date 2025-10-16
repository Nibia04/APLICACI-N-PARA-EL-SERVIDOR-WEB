# 🛒 API REST Marketplace - NestJS + TypeORM + SQLite

API REST completa para un sistema de marketplace desarrollada con NestJS, TypeORM y SQLite.

## Distribucion del proyecto
- Integrante 1 Wendy Moreira: Entidades maestras (catálogos, configuraciones, clasificaciones)
- Integrante 2 Nibia Rodríguez: Entidades de negocio principal (operaciones core del dominio)
- Integrante 3 Diego Velez: Entidades transaccionales (movimientos, registros, logs)

## 📋 Descripción del Proyecto

Sistema de gestión de marketplace que permite la administración de usuarios, emprendedores, clientes, productos, órdenes, pagos y más. Implementa una arquitectura por capas con controladores, servicios, DTOs y entidades.

## 🏗️ Arquitectura

El proyecto sigue una arquitectura de capas:
- **Entities**: Definición de entidades de base de datos con TypeORM
- **DTOs**: Data Transfer Objects para validación de datos
- **Services**: Lógica de negocio
- **Controllers**: Endpoints HTTP REST
- **Modules**: Encapsulación de funcionalidades

## 📦 Entidades Implementadas

### Entidades Maestras
1. **Usuarios** - Gestión de usuarios del sistema
2. **Categorías** - Clasificación de productos

### Entidades de Negocio
3. **Emprendedores** - Gestión de emprendedores/vendedores
4. **Clientes** - Información de clientes
5. **Productos** - Catálogo de productos
6. **Tarjetas Virtuales** - Métodos de pago de clientes

### Entidades Transaccionales
7. **Carritos de Compra** - Carritos activos de clientes
8. **Detalles de Carro** - Items en carritos de compra
9. **Órdenes** - Órdenes de compra generadas
10. **Detalles de Orden** - Items en órdenes
11. **Pagos** - Registro de transacciones de pago
12. **Historial de Compras** - Registro histórico de compras
13. **Favoritos** - Productos marcados como favoritos

## 🚀 Instalación

### Prerrequisitos
- Node.js (v18 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd Practica4
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar la base de datos**
La base de datos SQLite se creará automáticamente al iniciar la aplicación.

4. **Ejecutar la aplicación**

Modo desarrollo:
```bash
npm run start:dev
```

Modo producción:
```bash
npm run build
npm run start:prod
```

## 📡 API Endpoints

La API está disponible en `http://localhost:3000/api/v1`

### Usuarios
- `GET    /api/v1/usuarios` - Obtener todos los usuarios
- `GET    /api/v1/usuarios/:id` - Obtener un usuario por ID
- `POST   /api/v1/usuarios` - Crear un nuevo usuario
- `PATCH  /api/v1/usuarios/:id` - Actualizar un usuario
- `DELETE /api/v1/usuarios/:id` - Eliminar un usuario

### Emprendedores
- `GET    /api/v1/emprendedores` - Obtener todos los emprendedores
- `GET    /api/v1/emprendedores/:id` - Obtener un emprendedor por ID
- `POST   /api/v1/emprendedores` - Crear un nuevo emprendedor
- `PATCH  /api/v1/emprendedores/:id` - Actualizar un emprendedor
- `DELETE /api/v1/emprendedores/:id` - Eliminar un emprendedor

### Clientes
- `GET    /api/v1/clientes` - Obtener todos los clientes
- `GET    /api/v1/clientes/:id` - Obtener un cliente por ID
- `POST   /api/v1/clientes` - Crear un nuevo cliente
- `PATCH  /api/v1/clientes/:id` - Actualizar un cliente
- `DELETE /api/v1/clientes/:id` - Eliminar un cliente

### Categorías
- `GET    /api/v1/categorias` - Obtener todas las categorías
- `GET    /api/v1/categorias/:id` - Obtener una categoría por ID
- `POST   /api/v1/categorias` - Crear una nueva categoría
- `PATCH  /api/v1/categorias/:id` - Actualizar una categoría
- `DELETE /api/v1/categorias/:id` - Eliminar una categoría

### Productos
- `GET    /api/v1/productos` - Obtener todos los productos
- `GET    /api/v1/productos/:id` - Obtener un producto por ID
- `POST   /api/v1/productos` - Crear un nuevo producto
- `PATCH  /api/v1/productos/:id` - Actualizar un producto
- `DELETE /api/v1/productos/:id` - Eliminar un producto

### Tarjetas Virtuales
- `GET    /api/v1/tarjetas-virtuales` - Obtener todas las tarjetas
- `GET    /api/v1/tarjetas-virtuales/:id` - Obtener una tarjeta por ID
- `POST   /api/v1/tarjetas-virtuales` - Crear una nueva tarjeta
- `PATCH  /api/v1/tarjetas-virtuales/:id` - Actualizar una tarjeta
- `DELETE /api/v1/tarjetas-virtuales/:id` - Eliminar una tarjeta

### Carritos de Compra
- `GET    /api/v1/carritos-compra` - Obtener todos los carritos
- `GET    /api/v1/carritos-compra/:id` - Obtener un carrito por ID
- `POST   /api/v1/carritos-compra` - Crear un nuevo carrito
- `PATCH  /api/v1/carritos-compra/:id` - Actualizar un carrito
- `DELETE /api/v1/carritos-compra/:id` - Eliminar un carrito

### Detalles de Carro
- `GET    /api/v1/detalles-carro` - Obtener todos los detalles
- `GET    /api/v1/detalles-carro/:id` - Obtener un detalle por ID
- `POST   /api/v1/detalles-carro` - Crear un nuevo detalle
- `PATCH  /api/v1/detalles-carro/:id` - Actualizar un detalle
- `DELETE /api/v1/detalles-carro/:id` - Eliminar un detalle

### Órdenes
- `GET    /api/v1/ordenes` - Obtener todas las órdenes
- `GET    /api/v1/ordenes/:id` - Obtener una orden por ID
- `POST   /api/v1/ordenes` - Crear una nueva orden
- `PATCH  /api/v1/ordenes/:id` - Actualizar una orden
- `DELETE /api/v1/ordenes/:id` - Eliminar una orden

### Detalles de Orden
- `GET    /api/v1/detalles-orden` - Obtener todos los detalles
- `GET    /api/v1/detalles-orden/:id` - Obtener un detalle por ID
- `POST   /api/v1/detalles-orden` - Crear un nuevo detalle
- `PATCH  /api/v1/detalles-orden/:id` - Actualizar un detalle
- `DELETE /api/v1/detalles-orden/:id` - Eliminar un detalle

### Pagos
- `GET    /api/v1/pagos` - Obtener todos los pagos
- `GET    /api/v1/pagos/:id` - Obtener un pago por ID
- `POST   /api/v1/pagos` - Crear un nuevo pago
- `PATCH  /api/v1/pagos/:id` - Actualizar un pago
- `DELETE /api/v1/pagos/:id` - Eliminar un pago

### Historial de Compras
- `GET    /api/v1/historial-compras` - Obtener todo el historial
- `GET    /api/v1/historial-compras/:id` - Obtener un registro por ID
- `POST   /api/v1/historial-compras` - Crear un nuevo registro
- `PATCH  /api/v1/historial-compras/:id` - Actualizar un registro
- `DELETE /api/v1/historial-compras/:id` - Eliminar un registro

### Favoritos
- `GET    /api/v1/favoritos` - Obtener todos los favoritos
- `GET    /api/v1/favoritos/:id` - Obtener un favorito por ID
- `POST   /api/v1/favoritos` - Crear un nuevo favorito
- `PATCH  /api/v1/favoritos/:id` - Actualizar un favorito
- `DELETE /api/v1/favoritos/:id` - Eliminar un favorito

## 📝 Ejemplos de Uso

### Crear un Usuario
```bash
POST http://localhost:3000/api/v1/usuarios
Content-Type: application/json

{
  "nombre": "Juan",
  "apellido": "Pérez",
  "email": "juan.perez@example.com",
  "password": "password123",
  "telefono": "0998765432",
  "rol": "cliente"
}
```

### Crear un Emprendedor
```bash
POST http://localhost:3000/api/v1/emprendedores
Content-Type: application/json

{
  "nombreTienda": "Tienda Tech",
  "descripcionTienda": "Venta de productos tecnológicos",
  "direccion": "Av. Principal 123",
  "telefono": "0991234567",
  "usuarioId": 1
}
```

### Crear un Producto
```bash
POST http://localhost:3000/api/v1/productos
Content-Type: application/json

{
  "nombre": "Laptop HP",
  "descripcion": "Laptop HP Pavilion 15\"",
  "precio": 850.00,
  "stock": 10,
  "categoriaId": 1,
  "emprendedorId": 1
}
```

### Crear una Orden
```bash
POST http://localhost:3000/api/v1/ordenes
Content-Type: application/json

{
  "numeroOrden": "ORD-2025-001",
  "total": 850.00,
  "estado": "pendiente",
  "clienteId": 1
}
```

## 🔧 Tecnologías Utilizadas

- **NestJS** - Framework de Node.js
- **TypeORM** - ORM para TypeScript
- **SQLite** - Base de datos
- **Class Validator** - Validación de DTOs
- **Class Transformer** - Transformación de objetos

## 📂 Estructura del Proyecto

```
src/
├── usuarios/
│   ├── entities/
│   │   └── usuario.entity.ts
│   ├── dto/
│   │   ├── create-usuario.dto.ts
│   │   └── update-usuario.dto.ts
│   ├── usuarios.controller.ts
│   ├── usuarios.service.ts
│   └── usuarios.module.ts
├── emprendedores/
├── clientes/
├── categorias/
├── productos/
├── tarjetas-virtuales/
├── carritos-compra/
├── detalles-carro/
├── ordenes/
├── detalles-orden/
├── pagos/
├── historial-compras/
├── favoritos/
├── app.module.ts
└── main.ts
```

## 🗃️ Base de Datos

El proyecto utiliza SQLite como base de datos. El archivo `marketplace.sqlite` se crea automáticamente en la raíz del proyecto al ejecutar la aplicación.

### Relaciones entre Entidades

- Usuario → Emprendedor (1:N)
- Usuario → Cliente (1:N)
- Categoría → Producto (1:N)
- Emprendedor → Producto (1:N)
- Cliente → CarritoCompra (1:N)
- Cliente → TarjetaVirtual (1:N)
- Cliente → Orden (1:N)
- CarritoCompra → DetalleCarro (1:N)
- Producto → DetalleCarro (1:N)
- Orden → DetalleOrden (1:N)
- Producto → DetalleOrden (1:N)
- Orden → Pago (1:N)
- TarjetaVirtual → Pago (1:N)
- Cliente → Favorito (1:N)
- Producto → Favorito (1:N)

## ✅ Validaciones

Todos los DTOs incluyen validaciones utilizando `class-validator`:

- `@IsNotEmpty()` - Campo requerido
- `@IsString()` - Debe ser texto
- `@IsEmail()` - Debe ser email válido
- `@IsNumber()` - Debe ser número
- `@IsBoolean()` - Debe ser booleano
- `@Min()` / `@Max()` - Valores mínimos/máximos
- `@MinLength()` / `@MaxLength()` - Longitud de texto

## 🛡️ Manejo de Errores

La API implementa manejo de errores estándar de NestJS:

- `NotFoundException` - Recurso no encontrado (404)
- `ConflictException` - Conflicto de datos (409)
- `BadRequestException` - Datos inválidos (400)

## 👥 Equipo de Desarrollo

Este proyecto fue desarrollado como parte de la Práctica 4 del curso de Aplicaciones para el Servidor Web.

## 📄 Licencia

Este proyecto es de uso académico.

---

**Desarrollado con ❤️ usando NestJS**
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
