# 🚀 Ejemplos de Uso en Apollo Playground

## 📍 URL de Apollo
```
http://localhost:3001/graphql
```

---

## 1️⃣ USUARIOS

### ✅ Crear Usuario
```graphql
mutation {
  createUsuario(createUsuarioInput: {
    nombre: "Juan"
    apellido: "Pérez"
    email: "juan@email.com"
    password: "password123"
    telefono: "0987654321"
    rol: "cliente"
  }) {
    id
    nombre
    apellido
    email
    rol
    fechaCreacion
  }
}
```

### 📋 Listar Usuarios
```graphql
query {
  usuarios {
    id
    nombre
    apellido
    email
    telefono
    rol
    activo
  }
}
```

### 📋 Listar Usuarios con Fechas
```graphql
query {
  usuarios {
    id
    nombre
    apellido
    email
    rol
    activo
    fechaCreacion
    fechaActualizacion
  }
}
```

### 🔍 Buscar Usuario por ID
```graphql
query {
  usuario(id: 1) {
    id
    nombre
    apellido
    email
    telefono
    rol
  }
}
```

### ✏️ Actualizar Usuario
```graphql
mutation {
  updateUsuario(updateUsuarioInput: {
    id: 1
    email: "nuevo@email.com"
    activo: true
  }) {
    id
    email
    activo
  }
}
```

### 🗑️ Eliminar Usuario
```graphql
mutation {
  removeUsuario(id: 1) {
    id
    nombre
    apellido
  }
}
```

---

## 2️⃣ CLIENTES

### ✅ Crear Cliente
```graphql
mutation {
  createCliente(createClienteInput: {
    nombre: "Juan"
    apellido: "Pérez"
    direccion: "Av. Principal 123"
    telefono: "0987654321"
    fechaNacimiento: "1990-05-15"
    usuarioId: 1
  }) {
    id
    nombre
    apellido
    telefono
    activo
  }
}
```

### 📋 Listar Clientes
```graphql
query {
  clientes {
    id
    nombre
    apellido
    direccion
    telefono
    fechaNacimiento
    activo
    usuarioId
  }
}
```

### 📋 Listar Clientes con Información de Usuario
```graphql
query {
  clientes {
    id
    nombre
    apellido
    telefono
    activo
    usuario {
      id
      email
      rol
    }
  }
}
```

---

## 3️⃣ CATEGORÍAS

### ✅ Crear Categoría
```graphql
mutation {
  createCategoria(createCategoriaInput: {
    nombre: "Electrónica"
    descripcion: "Productos electrónicos y tecnología"
  }) {
    id
    nombre
    descripcion
    activo
  }
}
```

### 📋 Listar Categorías
```graphql
query {
  categorias {
    id
    nombre
    descripcion
    activo
    fechaCreacion
  }
}
```

---

## 4️⃣ EMPRENDEDORES

### ✅ Crear Emprendedor
```graphql
mutation {
  createEmprendedore(createEmprendedoreInput: {
    nombreTienda: "TechStore"
    descripcionTienda: "Tienda de tecnología y gadgets"
    rating: 4.5
    direccion: "Centro Comercial, Local 25"
    telefono: "0991234567"
    imagenTienda: "https://example.com/logo.png"
    usuarioId: 2
  }) {
    id
    nombreTienda
    descripcionTienda
    rating
    activo
  }
}
```

### 📋 Listar Emprendedores
```graphql
query {
  emprendedores {
    id
    nombreTienda
    descripcionTienda
    rating
    activo
    direccion
    telefono
  }
}
```

---

## 5️⃣ PRODUCTOS

### ✅ Crear Producto
```graphql
mutation {
  createProducto(createProductoInput: {
    nombre: "Laptop Gaming"
    descripcion: "Laptop de alto rendimiento para gaming"
    precio: 1299.99
    stock: 10
    imagenUrl: "https://example.com/laptop.jpg"
    categoriaId: 1
    emprendedorId: 1
  }) {
    id
    nombre
    descripcion
    precio
    stock
    disponible
  }
}
```

### 📋 Listar Productos
```graphql
query {
  productos {
    id
    nombre
    descripcion
    precio
    stock
    rating
    disponible
    imagen
    categoriaId
    emprendedorId
  }
}
```

### 📋 Listar Productos con Relaciones
```graphql
query {
  productos {
    id
    nombre
    precio
    stock
    disponible
    categoria {
      id
      nombre
    }
    emprendedor {
      id
      nombreTienda
      rating
    }
  }
}
```

### 📋 Buscar Productos por Categoría (ejemplo conceptual)
```graphql
# Nota: Esta consulta mostrará todos los productos
# En el futuro se puede implementar filtrado en el backend
query {
  productos {
    id
    nombre
    precio
    categoriaId
  }
}
```

---

## 6️⃣ CARRITO DE COMPRAS

### ✅ Crear Carrito
```graphql
mutation {
  createCarritoDeCompra(createCarritoDeCompraInput: {
    total: 0
    activo: true
    clienteId: 1
  }) {
    id
    total
    activo
    clienteId
  }
}
```

### 📋 Listar Carritos
```graphql
query {
  carritoDeCompras {
    id
    total
    activo
    clienteId
    fechaCreacion
  }
}
```

---

## 7️⃣ DETALLES DEL CARRITO

### ✅ Agregar Producto al Carrito
```graphql
mutation {
  createDetallesCarrito(createDetallesCarritoInput: {
    cantidad: 2
    precioUnitario: 1299.99
    subtotal: 2599.98
    carritoId: 1
    productoId: 1
  }) {
    id
    cantidad
    precioUnitario
    subtotal
    carritoId
    productoId
  }
}
```

### 📋 Ver Detalles del Carrito
```graphql
query {
  detallesCarrito {
    id
    cantidad
    precioUnitario
    subtotal
    carritoId
    productoId
  }
}
```

---

## 8️⃣ ÓRDENES

### ✅ Crear Orden
```graphql
mutation {
  createOrdene(createOrdeneInput: {
    numeroOrden: "ORD-2025-001"
    total: 2599.98
    estado: "pendiente"
    observaciones: "Entrega rápida por favor"
    clienteId: 1
  }) {
    id
    numeroOrden
    total
    estado
    observaciones
    clienteId
  }
}
```

### 📋 Listar Órdenes
```graphql
query {
  ordenes {
    id
    numeroOrden
    total
    estado
    observaciones
    clienteId
    fechaOrden
    fechaActualizacion
  }
}
```

### 📋 Listar Órdenes con Información del Cliente
```graphql
query {
  ordenes {
    id
    numeroOrden
    total
    estado
    fechaOrden
    cliente {
      id
      nombre
      apellido
      telefono
    }
  }
}
```

### 📋 Buscar Órdenes por Estado
```graphql
# Consultar todas las órdenes y filtrar manualmente
query {
  ordenes {
    id
    numeroOrden
    total
    estado
    fechaOrden
  }
}
```

---

## 9️⃣ DETALLES DE ORDEN

### ✅ Agregar Detalle a Orden
```graphql
mutation {
  createDellatesOrden(createDellatesOrdenInput: {
    cantidad: 2
    precioUnitario: 1299.99
    subtotal: 2599.98
    ordenId: 1
    productoId: 1
  }) {
    id
    cantidad
    precioUnitario
    subtotal
    ordenId
    productoId
  }
}
```

### 📋 Ver Detalles de Orden
```graphql
query {
  dellatesOrden {
    id
    cantidad
    precioUnitario
    subtotal
    ordenId
    productoId
  }
}
```

---

## 🔟 PAGOS

### ✅ Crear Pago
```graphql
mutation {
  createPago(createPagoInput: {
    monto: 2599.98
    metodoPago: "tarjeta"
    estado: "completado"
    codigoTransaccion: "TRX-20250123-001"
    observaciones: "Pago procesado exitosamente"
    ordenId: 1
    tarjetaId: 1
  }) {
    id
    monto
    metodoPago
    estado
    codigoTransaccion
    ordenId
  }
}
```

### 📋 Listar Pagos
```graphql
query {
  pagos {
    id
    monto
    metodoPago
    estado
    codigoTransaccion
    observaciones
    ordenId
    tarjetaId
  }
}
```

---

## 1️⃣1️⃣ TARJETAS VIRTUALES

### ✅ Crear Tarjeta Virtual
```graphql
mutation {
  createTrajetasVirtuale(createTrajetasVirtualeInput: {
    numeroTarjeta: "4532123456789012"
    nombreTitular: "Juan Pérez"
    fechaExpiracion: "2028-12-31"
    cvv: "123"
    saldo: 5000.00
    activa: true
    clienteId: 1
  }) {
    id
    numeroTarjeta
    nombreTitular
    saldo
    activa
  }
}
```

### 📋 Listar Tarjetas
```graphql
query {
  trajetasVirtuales {
    id
    numeroTarjeta
    nombreTitular
    fechaExpiracion
    saldo
    activa
    clienteId
  }
}
```

---

## 1️⃣2️⃣ FAVORITOS

### ✅ Agregar a Favoritos
```graphql
mutation {
  createFavorito(createFavoritoInput: {
    clienteId: 1
    productoId: 1
  }) {
    id
    clienteId
    productoId
    fechaCreacion
  }
}
```

### 📋 Listar Favoritos
```graphql
query {
  favoritos {
    id
    clienteId
    productoId
    fechaCreacion
  }
}
```

---

## 1️⃣3️⃣ HISTORIAL DE COMPRAS

### ✅ Crear Historial de Compra
```graphql
mutation {
  createHistorialCompra(createHistorialCompraInput: {
    total: 2599.98
    estado: "completado"
    observaciones: "Compra entregada"
    clienteId: 1
    ordenId: 1
  }) {
    id
    total
    estado
    observaciones
    clienteId
    ordenId
  }
}
```

### 📋 Listar Historial
```graphql
query {
  historialCompras {
    id
    total
    estado
    observaciones
    clienteId
    ordenId
    fechaCreacion
  }
}
```

---

## 🎯 FLUJO COMPLETO DE COMPRA

### Paso 1: Crear Usuario
```graphql
mutation {
  createUsuario(createUsuarioInput: {
    nombre: "María"
    apellido: "López"
    email: "maria@email.com"
    password: "password123"
    telefono: "0987654321"
    rol: "cliente"
  }) {
    id
  }
}
```

### Paso 2: Crear Cliente
```graphql
mutation {
  createCliente(createClienteInput: {
    nombre: "María"
    apellido: "López"
    direccion: "Calle Falsa 123"
    telefono: "0987654321"
    fechaNacimiento: "1995-03-20"
    usuarioId: 1  # ID del usuario creado
  }) {
    id
  }
}
```

### Paso 3: Crear Categoría
```graphql
mutation {
  createCategoria(createCategoriaInput: {
    nombre: "Electrónica"
    descripcion: "Productos tecnológicos"
  }) {
    id
  }
}
```

### Paso 4: Crear Emprendedor
```graphql
# Primero crea otro usuario para el emprendedor
mutation {
  createUsuario(createUsuarioInput: {
    nombre: "Carlos"
    apellido: "Merchant"
    email: "carlos@email.com"
    password: "password123"
    telefono: "0991234567"
    rol: "emprendedor"
  }) {
    id
  }
}

# Luego crea el emprendedor con el ID del usuario
mutation {
  createEmprendedore(createEmprendedoreInput: {
    nombreTienda: "TechShop"
    descripcionTienda: "Lo mejor en tecnología"
    rating: 5.0
    direccion: "Local 10"
    telefono: "0991234567"
    usuarioId: 2  # ID del segundo usuario creado
  }) {
    id
  }
}
```

### Paso 5: Crear Producto
```graphql
mutation {
  createProducto(createProductoInput: {
    nombre: "Mouse Gamer"
    descripcion: "Mouse RGB de alta precisión"
    precio: 49.99
    stock: 50
    categoriaId: 1
    emprendedorId: 1
  }) {
    id
  }
}
```

### Paso 6: Crear Carrito
```graphql
mutation {
  createCarritoDeCompra(createCarritoDeCompraInput: {
    total: 0
    activo: true
    clienteId: 1
  }) {
    id
  }
}
```

### Paso 7: Agregar Producto al Carrito
```graphql
mutation {
  createDetallesCarrito(createDetallesCarritoInput: {
    cantidad: 1
    precioUnitario: 49.99
    subtotal: 49.99
    carritoId: 1
    productoId: 1
  }) {
    id
  }
}
```

### Paso 8: Crear Orden
```graphql
mutation {
  createOrdene(createOrdeneInput: {
    numeroOrden: "ORD-001"
    total: 49.99
    estado: "pendiente"
    clienteId: 1
  }) {
    id
  }
}
```

### Paso 9: Crear Tarjeta
```graphql
mutation {
  createTrajetasVirtuale(createTrajetasVirtualeInput: {
    numeroTarjeta: "4532123456789012"
    nombreTitular: "María López"
    fechaExpiracion: "2028-12-31"
    cvv: "123"
    saldo: 1000.00
    activa: true
    clienteId: 1
  }) {
    id
  }
}
```

### Paso 10: Procesar Pago
```graphql
mutation {
  createPago(createPagoInput: {
    monto: 49.99
    metodoPago: "tarjeta"
    estado: "completado"
    codigoTransaccion: "TRX-001"
    ordenId: 1
    tarjetaId: 1
  }) {
    id
  }
}
```

---

## 📝 NOTAS IMPORTANTES

1. **IDs Dinámicos**: Reemplaza los IDs en los ejemplos con los IDs reales que obtengas al crear los registros.

2. **Formato de Fechas**: Usa formato ISO 8601: `"YYYY-MM-DD"` o `"YYYY-MM-DDTHH:mm:ss.sssZ"`

3. **Campos Opcionales**: Los campos con `?` en TypeScript son opcionales y puedes omitirlos.

4. **Validaciones**: El servidor GraphQL validará automáticamente los tipos de datos.

5. **API REST**: Recuerda que el API REST debe estar corriendo en `http://localhost:3000`

---

## 🛠️ TROUBLESHOOTING

### Error: "Cannot return null for non-nullable field"
- Verifica que el ID exista en el API REST
- Asegúrate de que el API REST esté corriendo

### Error: "Network error"
- Verifica que ambos servidores estén corriendo
- REST API: `http://localhost:3000`
- GraphQL: `http://localhost:3001`

### Error: "Field does not exist"
- Verifica que el nombre del campo esté correcto
- Revisa la documentación del schema en Apollo Playground
