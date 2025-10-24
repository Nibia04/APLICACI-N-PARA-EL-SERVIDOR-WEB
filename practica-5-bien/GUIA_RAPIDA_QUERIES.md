# 🎯 Guía Rápida - Queries Optimizados GraphQL

## 🚀 Queries Más Útiles

### 1. Usuario con Información Completa
```graphql
query {
  usuario(id: 1) {
    id
    nombre
    apellido
    email
    telefono
    rol
    activo
    fechaCreacion
    fechaActualizacion
  }
}
```

---

### 2. Productos con Categoría y Emprendedor
```graphql
query ProductosDetallados {
  productos {
    id
    nombre
    descripcion
    precio
    stock
    rating
    disponible
    
    # Info de la categoría
    categoria {
      id
      nombre
      descripcion
    }
    
    # Info del vendedor
    emprendedor {
      id
      nombreTienda
      rating
      telefono
      
      # Usuario del emprendedor
      usuario {
        nombre
        apellido
        email
      }
    }
  }
}
```

---

### 3. Órdenes con Cliente Completo
```graphql
query OrdenesCompletas {
  ordenes {
    id
    numeroOrden
    total
    estado
    observaciones
    fechaOrden
    fechaActualizacion
    
    # Información del cliente
    cliente {
      id
      nombre
      apellido
      telefono
      direccion
      
      # Usuario del cliente
      usuario {
        email
        rol
        activo
      }
    }
  }
}
```

---

### 4. Carrito con Productos
```graphql
query CarritoCompleto {
  carritoDeCompras {
    id
    total
    activo
    fechaCreacion
    
    cliente {
      nombre
      apellido
    }
  }
  
  detallesCarrito {
    id
    cantidad
    precioUnitario
    subtotal
    
    producto {
      nombre
      precio
      imagen
    }
  }
}
```

---

### 5. Historial de Compras del Cliente
```graphql
query HistorialCliente {
  historialCompras {
    id
    total
    estado
    fechaCompra
    observaciones
    
    # Detalles del cliente
    cliente {
      nombre
      apellido
      email: usuario {
        email
      }
    }
    
    # Orden asociada
    orden {
      numeroOrden
      estado
      fechaOrden
    }
  }
}
```

---

### 6. Productos Favoritos
```graphql
query FavoritosCliente {
  favoritos {
    id
    fechaAgregado
    
    cliente {
      nombre
      apellido
    }
    
    producto {
      nombre
      precio
      imagen
      disponible
      
      emprendedor {
        nombreTienda
        rating
      }
    }
  }
}
```

---

### 7. Pagos con Detalles de Orden
```graphql
query PagosDetallados {
  pagos {
    id
    monto
    metodoPago
    estado
    codigoTransaccion
    fechaPago
    observaciones
    
    # Orden pagada
    orden {
      numeroOrden
      total
      estado
      
      # Cliente que pagó
      cliente {
        nombre
        apellido
        telefono
      }
    }
  }
}
```

---

### 8. Emprendedores con Productos
```graphql
query EmprendedoresCompletos {
  emprendedores {
    id
    nombreTienda
    descripcionTienda
    rating
    direccion
    telefono
    activo
    
    usuario {
      nombre
      apellido
      email
      telefono
    }
  }
  
  productos {
    nombre
    precio
    stock
    emprendedorId
  }
}
```

---

### 9. Detalles Completos de una Orden
```graphql
query OrdenEspecifica {
  ordene(id: 1) {
    numeroOrden
    total
    estado
    observaciones
    fechaOrden
    
    cliente {
      nombre
      apellido
      direccion
      telefono
    }
  }
  
  dellatesOrden {
    cantidad
    precioUnitario
    subtotal
    
    producto {
      nombre
      descripcion
      imagen
    }
  }
}
```

---

### 10. Tarjetas Virtuales del Cliente
```graphql
query TarjetasCliente {
  trajetasVirtuales {
    id
    numeroTarjeta
    nombreTitular
    fechaExpiracion
    saldo
    activa
    
    cliente {
      nombre
      apellido
      telefono
      
      usuario {
        email
      }
    }
  }
}
```

---

## 💡 Tips de Optimización

### ✅ Solo Pide lo que Necesitas
```graphql
# ❌ Evita esto (demasiados datos)
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
    fechaCreacion
    fechaActualizacion
    categoriaId
    emprendedorId
  }
}

# ✅ Mejor (solo lo necesario)
query {
  productos {
    id
    nombre
    precio
    disponible
  }
}
```

---

### ✅ Usa Alias para Múltiples Queries
```graphql
query {
  # Productos de electrónica
  electronica: productos {
    id
    nombre
    precio
  }
  
  # Todas las categorías
  todasCategorias: categorias {
    id
    nombre
  }
}
```

---

### ✅ Usa Variables para Queries Dinámicas
```graphql
query ObtenerProducto($id: Int!) {
  producto(id: $id) {
    id
    nombre
    precio
    stock
  }
}

# Variables:
{
  "id": 1
}
```

---

### ✅ Fragmentos para Reutilizar
```graphql
fragment ClienteBasico on Cliente {
  id
  nombre
  apellido
  telefono
}

fragment UsuarioBasico on Usuario {
  id
  email
  rol
  activo
}

query {
  clientes {
    ...ClienteBasico
    usuario {
      ...UsuarioBasico
    }
  }
}
```

---

## 🎨 Mutations Optimizadas

### Crear Usuario con Respuesta Completa
```graphql
mutation CrearUsuarioCompleto($input: CreateUsuarioInput!) {
  createUsuario(createUsuarioInput: $input) {
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

# Variables:
{
  "input": {
    "nombre": "Juan",
    "apellido": "Pérez",
    "email": "juan@email.com",
    "password": "password123",
    "telefono": "0987654321",
    "rol": "cliente"
  }
}
```

---

### Actualizar Producto con Verificación
```graphql
mutation ActualizarProducto($input: UpdateProductoInput!) {
  updateProducto(updateProductoInput: $input) {
    id
    nombre
    precio
    stock
    disponible
    fechaActualizacion
  }
}

# Variables:
{
  "input": {
    "id": 1,
    "precio": 899.99,
    "stock": 50
  }
}
```

---

## 🔍 Queries de Búsqueda Avanzadas

### Buscar Producto Específico
```graphql
query BuscarProducto($id: Int!) {
  producto(id: $id) {
    id
    nombre
    descripcion
    precio
    stock
    rating
    disponible
    imagen
    
    categoria {
      nombre
      descripcion
    }
    
    emprendedor {
      nombreTienda
      rating
      telefono
      
      usuario {
        email
      }
    }
  }
}
```

---

### Buscar Cliente con Todo su Historial
```graphql
query PerfilClienteCompleto($clienteId: Int!) {
  cliente(id: $clienteId) {
    nombre
    apellido
    direccion
    telefono
    fechaNacimiento
    
    usuario {
      email
      rol
      fechaCreacion
    }
  }
  
  # Órdenes del cliente (filtrar manualmente por clienteId)
  ordenes {
    numeroOrden
    total
    estado
    fechaOrden
    clienteId
  }
  
  # Favoritos del cliente
  favoritos {
    clienteId
    producto {
      nombre
      precio
    }
  }
}
```

---

## 📊 Queries de Estadísticas

### Resumen de Ventas
```graphql
query ResumenVentas {
  ordenes {
    total
    estado
    fechaOrden
  }
  
  pagos {
    monto
    estado
    metodoPago
    fechaPago
  }
}
```

### Productos Más Populares
```graphql
query ProductosPopulares {
  productos {
    nombre
    rating
    stock
    precio
    disponible
  }
}
```

---

## 🎯 Checklist de Testing

Prueba estos queries en Apollo Playground:

- [ ] Listar todos los usuarios
- [ ] Crear un usuario nuevo
- [ ] Buscar usuario por ID
- [ ] Listar productos con categoría
- [ ] Crear orden completa
- [ ] Ver detalles de orden con productos
- [ ] Listar pagos con información de orden
- [ ] Ver carrito con detalles
- [ ] Agregar producto a favoritos
- [ ] Ver historial de compras

---

## 🚀 ¡Listo para Usar!

Todas estas queries están optimizadas y listas para usar en:
- Apollo Playground: `http://localhost:3001/graphql`
- Tu aplicación frontend
- Testing automatizado
- Postman/Insomnia

¡Explora y disfruta tu API GraphQL optimizada! 🎉
