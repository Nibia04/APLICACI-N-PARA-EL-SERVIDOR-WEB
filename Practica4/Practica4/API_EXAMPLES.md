# 📋 Ejemplos de Pruebas API - Marketplace

Este archivo contiene ejemplos de pruebas para todos los endpoints de la API.

## 📌 Base URL
```
http://localhost:3000/api/v1
```

---

## 👤 Usuarios

### Crear Usuario
```http
POST /api/v1/usuarios
Content-Type: application/json

{
  "nombre": "María",
  "apellido": "González",
  "email": "maria.gonzalez@example.com",
  "password": "password123",
  "telefono": "0991234567",
  "rol": "cliente",
  "activo": true
}
```

### Obtener Todos los Usuarios
```http
GET /api/v1/usuarios
```

### Obtener Usuario por ID
```http
GET /api/v1/usuarios/1
```

### Actualizar Usuario
```http
PATCH /api/v1/usuarios/1
Content-Type: application/json

{
  "telefono": "0998765432",
  "activo": true
}
```

### Eliminar Usuario
```http
DELETE /api/v1/usuarios/1
```

---

## 🏪 Emprendedores

### Crear Emprendedor
```http
POST /api/v1/emprendedores
Content-Type: application/json

{
  "nombreTienda": "Tech Store Ecuador",
  "descripcionTienda": "Tienda especializada en productos tecnológicos",
  "direccion": "Av. Amazonas 123",
  "telefono": "0991234567",
  "rating": 4.5,
  "imagenTienda": "https://example.com/imagen.jpg",
  "activo": true,
  "usuarioId": 1
}
```

### Obtener Todos los Emprendedores
```http
GET /api/v1/emprendedores
```

### Obtener Emprendedor por ID
```http
GET /api/v1/emprendedores/1
```

### Actualizar Emprendedor
```http
PATCH /api/v1/emprendedores/1
Content-Type: application/json

{
  "rating": 4.8,
  "descripcionTienda": "La mejor tienda de tecnología en Ecuador"
}
```

### Eliminar Emprendedor
```http
DELETE /api/v1/emprendedores/1
```

---

## 👥 Clientes

### Crear Cliente
```http
POST /api/v1/clientes
Content-Type: application/json

{
  "nombre": "Carlos",
  "apellido": "Ramírez",
  "direccion": "Calle Principal 456",
  "telefono": "0987654321",
  "fechaNacimiento": "1995-05-15",
  "activo": true,
  "usuarioId": 2
}
```

### Obtener Todos los Clientes
```http
GET /api/v1/clientes
```

### Obtener Cliente por ID
```http
GET /api/v1/clientes/1
```

### Actualizar Cliente
```http
PATCH /api/v1/clientes/1
Content-Type: application/json

{
  "direccion": "Nueva dirección 789",
  "telefono": "0999888777"
}
```

### Eliminar Cliente
```http
DELETE /api/v1/clientes/1
```

---

## 📁 Categorías

### Crear Categoría
```http
POST /api/v1/categorias
Content-Type: application/json

{
  "nombre": "Electrónica",
  "descripcion": "Productos electrónicos y tecnológicos",
  "imagen": "https://example.com/electronica.jpg",
  "activo": true
}
```

### Obtener Todas las Categorías
```http
GET /api/v1/categorias
```

### Obtener Categoría por ID
```http
GET /api/v1/categorias/1
```

### Actualizar Categoría
```http
PATCH /api/v1/categorias/1
Content-Type: application/json

{
  "descripcion": "Electrónica de última generación"
}
```

### Eliminar Categoría
```http
DELETE /api/v1/categorias/1
```

---

## 🛍️ Productos

### Crear Producto
```http
POST /api/v1/productos
Content-Type: application/json

{
  "nombre": "Laptop Dell Inspiron 15",
  "descripcion": "Laptop Dell con procesador Intel i7, 16GB RAM, 512GB SSD",
  "precio": 1250.00,
  "stock": 15,
  "rating": 4.7,
  "disponible": true,
  "imagen": "https://example.com/laptop.jpg",
  "categoriaId": 1,
  "emprendedorId": 1
}
```

### Obtener Todos los Productos
```http
GET /api/v1/productos
```

### Obtener Producto por ID
```http
GET /api/v1/productos/1
```

### Actualizar Producto
```http
PATCH /api/v1/productos/1
Content-Type: application/json

{
  "precio": 1199.99,
  "stock": 20,
  "rating": 4.9
}
```

### Eliminar Producto
```http
DELETE /api/v1/productos/1
```

---

## 💳 Tarjetas Virtuales

### Crear Tarjeta Virtual
```http
POST /api/v1/tarjetas-virtuales
Content-Type: application/json

{
  "numeroTarjeta": "4532123456789012",
  "nombreTitular": "Carlos Ramírez",
  "fechaExpiracion": "12/2028",
  "cvv": "123",
  "saldo": 5000.00,
  "activa": true,
  "clienteId": 1
}
```

### Obtener Todas las Tarjetas
```http
GET /api/v1/tarjetas-virtuales
```

### Obtener Tarjeta por ID
```http
GET /api/v1/tarjetas-virtuales/1
```

### Actualizar Tarjeta
```http
PATCH /api/v1/tarjetas-virtuales/1
Content-Type: application/json

{
  "saldo": 4500.00
}
```

### Eliminar Tarjeta
```http
DELETE /api/v1/tarjetas-virtuales/1
```

---

## 🛒 Carritos de Compra

### Crear Carrito
```http
POST /api/v1/carritos-compra
Content-Type: application/json

{
  "total": 0.00,
  "activo": true,
  "clienteId": 1
}
```

### Obtener Todos los Carritos
```http
GET /api/v1/carritos-compra
```

### Obtener Carrito por ID
```http
GET /api/v1/carritos-compra/1
```

### Actualizar Carrito
```http
PATCH /api/v1/carritos-compra/1
Content-Type: application/json

{
  "total": 1250.00
}
```

### Eliminar Carrito
```http
DELETE /api/v1/carritos-compra/1
```

---

## 📦 Detalles de Carro

### Crear Detalle de Carro
```http
POST /api/v1/detalles-carro
Content-Type: application/json

{
  "cantidad": 2,
  "precioUnitario": 625.00,
  "subtotal": 1250.00,
  "carritoId": 1,
  "productoId": 1
}
```

### Obtener Todos los Detalles
```http
GET /api/v1/detalles-carro
```

### Obtener Detalle por ID
```http
GET /api/v1/detalles-carro/1
```

### Actualizar Detalle
```http
PATCH /api/v1/detalles-carro/1
Content-Type: application/json

{
  "cantidad": 3,
  "subtotal": 1875.00
}
```

### Eliminar Detalle
```http
DELETE /api/v1/detalles-carro/1
```

---

## 📋 Órdenes

### Crear Orden
```http
POST /api/v1/ordenes
Content-Type: application/json

{
  "numeroOrden": "ORD-2025-00001",
  "total": 1250.00,
  "estado": "pendiente",
  "observaciones": "Entrega urgente",
  "clienteId": 1
}
```

### Obtener Todas las Órdenes
```http
GET /api/v1/ordenes
```

### Obtener Orden por ID
```http
GET /api/v1/ordenes/1
```

### Actualizar Orden
```http
PATCH /api/v1/ordenes/1
Content-Type: application/json

{
  "estado": "procesando"
}
```

### Eliminar Orden
```http
DELETE /api/v1/ordenes/1
```

---

## 📦 Detalles de Orden

### Crear Detalle de Orden
```http
POST /api/v1/detalles-orden
Content-Type: application/json

{
  "cantidad": 2,
  "precioUnitario": 625.00,
  "subtotal": 1250.00,
  "ordenId": 1,
  "productoId": 1
}
```

### Obtener Todos los Detalles
```http
GET /api/v1/detalles-orden
```

### Obtener Detalle por ID
```http
GET /api/v1/detalles-orden/1
```

### Actualizar Detalle
```http
PATCH /api/v1/detalles-orden/1
Content-Type: application/json

{
  "cantidad": 3,
  "subtotal": 1875.00
}
```

### Eliminar Detalle
```http
DELETE /api/v1/detalles-orden/1
```

---

## 💰 Pagos

### Crear Pago
```http
POST /api/v1/pagos
Content-Type: application/json

{
  "monto": 1250.00,
  "metodoPago": "tarjeta",
  "estado": "completado",
  "codigoTransaccion": "TRX-2025-00001",
  "observaciones": "Pago procesado exitosamente",
  "ordenId": 1,
  "tarjetaId": 1
}
```

### Obtener Todos los Pagos
```http
GET /api/v1/pagos
```

### Obtener Pago por ID
```http
GET /api/v1/pagos/1
```

### Actualizar Pago
```http
PATCH /api/v1/pagos/1
Content-Type: application/json

{
  "estado": "verificado"
}
```

### Eliminar Pago
```http
DELETE /api/v1/pagos/1
```

---

## 📜 Historial de Compras

### Crear Historial
```http
POST /api/v1/historial-compras
Content-Type: application/json

{
  "total": 1250.00,
  "estado": "entregado",
  "observaciones": "Compra satisfactoria",
  "clienteId": 1,
  "ordenId": 1
}
```

### Obtener Todo el Historial
```http
GET /api/v1/historial-compras
```

### Obtener Historial por ID
```http
GET /api/v1/historial-compras/1
```

### Actualizar Historial
```http
PATCH /api/v1/historial-compras/1
Content-Type: application/json

{
  "observaciones": "Producto llegó en perfectas condiciones"
}
```

### Eliminar Historial
```http
DELETE /api/v1/historial-compras/1
```

---

## ⭐ Favoritos

### Crear Favorito
```http
POST /api/v1/favoritos
Content-Type: application/json

{
  "clienteId": 1,
  "productoId": 1
}
```

### Obtener Todos los Favoritos
```http
GET /api/v1/favoritos
```

### Obtener Favorito por ID
```http
GET /api/v1/favoritos/1
```

### Actualizar Favorito
```http
PATCH /api/v1/favoritos/1
Content-Type: application/json

{
  "productoId": 2
}
```

### Eliminar Favorito
```http
DELETE /api/v1/favoritos/1
```

---

## 🧪 Notas de Prueba

### Orden Recomendado de Creación de Datos:

1. **Usuarios** (base para todo)
2. **Categorías** (para productos)
3. **Emprendedores** (requiere usuarios)
4. **Clientes** (requiere usuarios)
5. **Productos** (requiere categorías y emprendedores)
6. **Tarjetas Virtuales** (requiere clientes)
7. **Carritos de Compra** (requiere clientes)
8. **Detalles de Carro** (requiere carritos y productos)
9. **Órdenes** (requiere clientes)
10. **Detalles de Orden** (requiere órdenes y productos)
11. **Pagos** (requiere órdenes y tarjetas)
12. **Historial de Compras** (requiere clientes y órdenes)
13. **Favoritos** (requiere clientes y productos)

### Códigos de Respuesta HTTP:

- `200 OK` - Solicitud exitosa (GET, PATCH, DELETE)
- `201 Created` - Recurso creado exitosamente (POST)
- `400 Bad Request` - Datos inválidos
- `404 Not Found` - Recurso no encontrado
- `409 Conflict` - Conflicto de datos (ej. email duplicado)

---

**Tip**: Puedes usar herramientas como Postman, Insomnia o Thunder Client para probar estos endpoints fácilmente.
