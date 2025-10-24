# 🚀 Gateway GraphQL - Sistema de E-commerce

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">
  Gateway GraphQL construido con NestJS que consume una API REST para proporcionar una interfaz GraphQL unificada
</p>

---

## 📋 Descripción del Proyecto y su Arquitectura

Este proyecto implementa un **Gateway GraphQL** que actúa como intermediario entre los clientes y una API REST existente. La arquitectura sigue el patrón de Gateway API, proporcionando una capa de abstracción GraphQL sobre servicios REST.

### 🏗️ Arquitectura del Sistema

```
┌─────────────┐      GraphQL       ┌──────────────────┐      REST API      ┌─────────────┐
│   Cliente   │ ─────────────────> │  GraphQL Gateway │ ─────────────────> │   REST API  │
│  (Apollo)   │                     │    (NestJS)      │                     │  (Practica4)│
└─────────────┘                     └──────────────────┘                     └─────────────┘
                                            │                                        │
                                            │                                        │
                                       Port 3001                                Port 3000
                                                                                     │
                                                                               ┌─────▼─────┐
                                                                               │   SQLite  │
                                                                               │  Database │
                                                                               └───────────┘
```

### 🎯 Componentes Principales

1. **GraphQL Gateway (Puerto 3001)**
   - Servidor Apollo GraphQL
   - 13 Módulos de negocio
   - Resolvers para queries y mutations
   - Cliente HTTP para consumir REST API

2. **REST API (Puerto 3000)**
   - API REST en NestJS
   - Base de datos SQLite
   - Endpoints en `/api/v1/*`
   - 13 Recursos CRUD

3. **Entidades del Sistema**
   - Usuarios
   - Clientes
   - Productos
   - Categorías
   - Emprendedores
   - Órdenes
   - Pagos
   - Carrito de Compras
   - Detalles de Carrito
   - Detalles de Orden
   - Favoritos
   - Historial de Compras
   - Tarjetas Virtuales

---

## 🚀 Instrucciones de Instalación y Ejecución

### Prerrequisitos

- Node.js (v18 o superior)
- npm (v9 o superior)
- Git

### 📦 Instalación

#### 1. Instalar dependencias del Gateway GraphQL

```bash
cd practica-5-bien
npm install
```

#### 2. Instalar dependencias de la API REST

```bash
cd ../Practica4
npm install
```

### ⚙️ Configuración

El archivo `.env` ya está configurado en el proyecto:

```env
API_REST_URL=http://localhost:3000/api/v1
PORT=3001
```

### ▶️ Ejecución de Ambos Servicios

#### Opción 1: Ejecución Manual (Recomendada)

**Terminal 1 - API REST:**
```bash
cd Practica4
npm run start:dev
```

Espera a ver el mensaje: `Application is running on: http://[::1]:3000`

**Terminal 2 - GraphQL Gateway:**
```bash
cd practica-5-bien
npm run start:dev
```

Espera a ver el mensaje: `GraphQL Server running on http://localhost:3001/graphql`

#### Opción 2: Script Automatizado (PowerShell)

```powershell
# Ejecutar desde la raíz del workspace
cd Primer-parcial

# Iniciar API REST en segundo plano
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd Practica4; npm run start:dev"

# Esperar 10 segundos
Start-Sleep -Seconds 10

# Iniciar GraphQL Gateway
cd practica-5-bien
npm run start:dev
```

### ✅ Verificación

Una vez iniciados ambos servicios, verifica:

1. **API REST:** http://localhost:3000/api/v1
2. **GraphQL Playground:** http://localhost:3001/graphql

---

## 📚 Documentación de las Queries Implementadas

### 🔍 Query 1: Listar Usuarios

**Descripción:** Obtiene la lista completa de usuarios registrados en el sistema.

**Argumentos:** Ninguno

**Ejemplo de uso:**
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
    fechaCreacion
    fechaActualizacion
  }
}
```

**Propósito de negocio:** Administración de usuarios del sistema, visualización de todos los usuarios registrados.

---

### 🔍 Query 2: Buscar Usuario por ID

**Descripción:** Obtiene la información detallada de un usuario específico.

**Argumentos:** 
- `id` (Int!): ID único del usuario

**Ejemplo de uso:**
```graphql
query {
  usuario(id: 1) {
    id
    nombre
    apellido
    email
    rol
    activo
    fechaCreacion
  }
}
```

**Propósito de negocio:** Visualizar perfil de usuario, edición de datos personales, verificación de información.

---

### 🔍 Query 3: Listar Productos con Relaciones

**Descripción:** Obtiene todos los productos disponibles con información de categoría y emprendedor.

**Argumentos:** Ninguno

**Ejemplo de uso:**
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
    categoria {
      id
      nombre
      descripcion
    }
    emprendedor {
      id
      nombreTienda
      rating
    }
  }
}
```

**Propósito de negocio:** Catálogo de productos, marketplace, búsqueda y filtrado de productos.

---

### 🔍 Query 4: Buscar Producto por ID

**Descripción:** Obtiene información detallada de un producto específico.

**Argumentos:**
- `id` (Int!): ID único del producto

**Ejemplo de uso:**
```graphql
query {
  producto(id: 1) {
    id
    nombre
    descripcion
    precio
    stock
    disponible
    categoria {
      nombre
    }
    emprendedor {
      nombreTienda
    }
  }
}
```

**Propósito de negocio:** Vista detallada del producto, información para decisión de compra.

---

### 🔍 Query 5: Listar Órdenes con Cliente

**Descripción:** Obtiene todas las órdenes con información del cliente asociado.

**Argumentos:** Ninguno

**Ejemplo de uso:**
```graphql
query {
  ordenes {
    id
    numeroOrden
    total
    estado
    fechaOrden
    cliente {
      nombre
      apellido
      telefono
    }
  }
}
```

**Propósito de negocio:** Gestión de órdenes, seguimiento de ventas, administración de pedidos.

---

### 🔍 Query 6: Buscar Orden por ID

**Descripción:** Obtiene información detallada de una orden específica.

**Argumentos:**
- `id` (Int!): ID único de la orden

**Ejemplo de uso:**
```graphql
query {
  ordene(id: 1) {
    id
    numeroOrden
    total
    estado
    observaciones
    fechaOrden
    cliente {
      nombre
      apellido
      direccion
    }
  }
}
```

**Propósito de negocio:** Detalle de orden individual, seguimiento de pedido, gestión de entregas.

---

### 🔍 Query 7: Listar Categorías

**Descripción:** Obtiene todas las categorías de productos disponibles.

**Argumentos:** Ninguno

**Ejemplo de uso:**
```graphql
query {
  categorias {
    id
    nombre
    descripcion
    activo
    imagen
    fechaCreacion
  }
}
```

**Propósito de negocio:** Navegación por categorías, organización del catálogo, filtrado de productos.

---

### 🔍 Query 8: Listar Carrito de Compras

**Descripción:** Obtiene información de los carritos de compra activos.

**Argumentos:** Ninguno

**Ejemplo de uso:**
```graphql
query {
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
}
```

**Propósito de negocio:** Gestión de carritos abandonados, análisis de comportamiento de compra.

---

### 🔍 Query 9: Listar Historial de Compras

**Descripción:** Obtiene el historial completo de compras realizadas.

**Argumentos:** Ninguno

**Ejemplo de uso:**
```graphql
query {
  historialCompras {
    id
    total
    estado
    fechaCompra
    observaciones
    cliente {
      nombre
      apellido
    }
    orden {
      numeroOrden
      estado
    }
  }
}
```

**Propósito de negocio:** Análisis de ventas históricas, reportes, seguimiento de compras del cliente.

---

## 📊 Diagrama de Arquitectura

```
                    ┌─────────────────────────────────────────┐
                    │         Cliente / Frontend              │
                    │    (Apollo Client, React, etc.)         │
                    └────────────────┬────────────────────────┘
                                     │
                                     │ GraphQL Queries/Mutations
                                     │ (HTTP/HTTPS - Port 3001)
                                     ▼
                    ┌─────────────────────────────────────────┐
                    │      GraphQL Gateway (practica-5-bien)  │
                    │                                          │
                    │  ┌─────────────────────────────────┐   │
                    │  │   Apollo Server + NestJS        │   │
                    │  └─────────────────────────────────┘   │
                    │                                          │
                    │  ┌────────────┐  ┌────────────┐        │
                    │  │  Usuarios  │  │  Productos │        │
                    │  │  Resolver  │  │  Resolver  │  ...   │
                    │  └────────────┘  └────────────┘        │
                    │                                          │
                    │  ┌─────────────────────────────────┐   │
                    │  │      HttpService (@nestjs/axios)│   │
                    │  └─────────────────────────────────┘   │
                    └────────────────┬────────────────────────┘
                                     │
                                     │ REST API Calls
                                     │ (HTTP - Port 3000)
                                     ▼
                    ┌─────────────────────────────────────────┐
                    │       REST API (Practica4)              │
                    │                                          │
                    │  ┌─────────────────────────────────┐   │
                    │  │      NestJS Controllers          │   │
                    │  └─────────────────────────────────┘   │
                    │                                          │
                    │  ┌─────────────────────────────────┐   │
                    │  │      Services Layer              │   │
                    │  └─────────────────────────────────┘   │
                    │                                          │
                    │  ┌─────────────────────────────────┐   │
                    │  │      TypeORM Repository          │   │
                    │  └─────────────────────────────────┘   │
                    └────────────────┬────────────────────────┘
                                     │
                                     │ SQL Queries
                                     ▼
                    ┌─────────────────────────────────────────┐
                    │         SQLite Database                  │
                    │                                          │
                    │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  │
                    │  │Users │ │Prods │ │Order │ │Paym. │  │
                    │  └──────┘ └──────┘ └──────┘ └──────┘  │
                    └─────────────────────────────────────────┘
```

### Flujo de Datos:

1. **Cliente → GraphQL Gateway:** Envía query/mutation GraphQL
2. **GraphQL Gateway → Resolvers:** Procesa la solicitud
3. **Resolvers → HttpService:** Traduce a llamadas REST
4. **HttpService → REST API:** Envía petición HTTP
5. **REST API → Database:** Ejecuta operaciones CRUD
6. **Database → REST API:** Retorna datos
7. **REST API → GraphQL Gateway:** Responde en JSON
8. **GraphQL Gateway → Cliente:** Retorna datos en formato GraphQL

---

## 👥 División de Trabajo y Responsabilidades del Equipo

### 👤 Integrante 1: [Nombre]
**Rol:** Arquitecto de GraphQL y Backend Lead

**Responsabilidades:**
- Diseño de la arquitectura GraphQL
- Implementación de esquemas y tipos
- Configuración de Apollo Server
- Queries: Usuarios, Clientes, Emprendedores

**Entregables:**
- Schemas de GraphQL
- Resolvers de Usuarios, Clientes, Emprendedores
- Configuración del proyecto base
- Documentación de arquitectura

---

### 👤 Integrante 2: [Nombre]
**Rol:** Especialista en Productos y Órdenes

**Responsabilidades:**
- Módulos de Productos y Categorías
- Sistema de Órdenes
- Relaciones entre entidades
- Queries: Productos, Categorías, Órdenes

**Entregables:**
- Resolvers de Productos, Categorías, Órdenes
- DTOs de creación y actualización
- Gestión de relaciones
- Testing de queries complejas

---

### 👤 Integrante 3: [Nombre]
**Rol:** Especialista en Pagos y Carrito

**Responsabilidades:**
- Sistema de Carrito de Compras
- Módulo de Pagos
- Historial de Compras
- Queries: Carrito, Pagos, Historial

**Entregables:**
- Resolvers de Carrito, Pagos, Historial
- Integración con API REST
- Optimización de queries
- Documentación de ejemplos

---

## 📅 Sección de Planificación

### 📋 Acta de Reunión Inicial

**Fecha:** [Fecha de reunión]  
**Participantes:** [Nombres de los 3 integrantes]  
**Duración:** 2 horas

**Objetivos de la Reunión:**
1. Definir la arquitectura del proyecto
2. Distribuir las 9 queries entre los integrantes
3. Establecer cronograma de trabajo
4. Acordar estándares de código

**Acuerdos Tomados:**
- Uso de NestJS + Apollo GraphQL
- Patrón Gateway para consumir REST API
- TypeScript como lenguaje principal
- Documentación en formato Markdown

---

### 🎯 Distribución de las 9 Queries

#### Integrante 1: Queries de Usuarios (3 queries)
1. **Query: Listar Usuarios**
   - Propósito: Obtener todos los usuarios del sistema
   - Complejidad: Baja
   - Tiempo estimado: 2 horas

2. **Query: Buscar Usuario por ID**
   - Propósito: Obtener información detallada de un usuario
   - Complejidad: Baja
   - Tiempo estimado: 1 hora

3. **Query: Listar Emprendedores**
   - Propósito: Obtener todos los emprendedores con sus tiendas
   - Complejidad: Media
   - Tiempo estimado: 3 horas

#### Integrante 2: Queries de Productos y Órdenes (3 queries)
4. **Query: Listar Productos con Relaciones**
   - Propósito: Catálogo completo con categorías y emprendedores
   - Complejidad: Alta
   - Tiempo estimado: 4 horas

5. **Query: Buscar Producto por ID**
   - Propósito: Vista detallada de un producto
   - Complejidad: Media
   - Tiempo estimado: 2 horas

6. **Query: Listar Órdenes con Cliente**
   - Propósito: Gestión de pedidos con información del cliente
   - Complejidad: Alta
   - Tiempo estimado: 4 horas

#### Integrante 3: Queries de Carrito y Pagos (3 queries)
7. **Query: Listar Categorías**
   - Propósito: Navegación por categorías de productos
   - Complejidad: Baja
   - Tiempo estimado: 2 horas

8. **Query: Listar Carrito de Compras**
   - Propósito: Visualización de carritos activos
   - Complejidad: Media
   - Tiempo estimado: 3 horas

9. **Query: Listar Historial de Compras**
   - Propósito: Registro histórico de compras realizadas
   - Complejidad: Alta
   - Tiempo estimado: 4 horas

---

### 📊 Cronograma de Trabajo

#### Semana 1: Configuración y Estructura Base
- **Día 1-2:** Configuración del proyecto NestJS + GraphQL
- **Día 3-4:** Implementación de módulos base y estructura
- **Día 5:** Configuración de conexión con REST API

#### Semana 2: Implementación de Queries (Parte 1)
- **Día 1-2:** Integrante 1 - Queries de Usuarios
- **Día 3-4:** Integrante 2 - Queries de Productos
- **Día 5:** Integración y testing de queries básicas

#### Semana 3: Implementación de Queries (Parte 2)
- **Día 1-2:** Integrante 3 - Queries de Carrito y Pagos
- **Día 3-4:** Implementación de queries con relaciones complejas
- **Día 5:** Testing integral de todas las queries

#### Semana 4: Optimización y Documentación
- **Día 1-2:** Optimización de queries y performance
- **Día 3-4:** Documentación completa del proyecto
- **Día 5:** Preparación de presentación final

---

### 📝 Descripción Breve de Cada Query y Propósito de Negocio

| # | Query | Integrante | Propósito de Negocio | Complejidad |
|---|-------|------------|---------------------|-------------|
| 1 | Listar Usuarios | 1 | Administración de usuarios del sistema | Baja |
| 2 | Buscar Usuario por ID | 1 | Perfil de usuario y edición de datos | Baja |
| 3 | Listar Emprendedores | 1 | Gestión de vendedores y tiendas | Media |
| 4 | Listar Productos con Relaciones | 2 | Catálogo completo del marketplace | Alta |
| 5 | Buscar Producto por ID | 2 | Vista detallada para decisión de compra | Media |
| 6 | Listar Órdenes con Cliente | 2 | Seguimiento y gestión de pedidos | Alta |
| 7 | Listar Categorías | 3 | Navegación y organización del catálogo | Baja |
| 8 | Listar Carrito de Compras | 3 | Gestión del proceso de compra | Media |
| 9 | Listar Historial de Compras | 3 | Análisis de ventas y reportes | Alta |

---

## 📖 Recursos Adicionales

- [EJEMPLOS_APOLLO.md](./EJEMPLOS_APOLLO.md) - Ejemplos completos de queries y mutations
- [OPTIMIZACIONES_GRAPHQL.md](./OPTIMIZACIONES_GRAPHQL.md) - Guía de optimizaciones implementadas
- [GUIA_RAPIDA_QUERIES.md](./GUIA_RAPIDA_QUERIES.md) - Queries listos para usar
- [INICIAR_SERVIDORES.md](./INICIAR_SERVIDORES.md) - Instrucciones detalladas de inicio

---

## 🛠️ Tecnologías Utilizadas

- **NestJS** v11.0.1 - Framework backend
- **GraphQL** v16.11.0 - Lenguaje de consulta
- **Apollo Server** v5.0.0 - Servidor GraphQL
- **TypeScript** v5.7.2 - Lenguaje de programación
- **Axios** v4.0.1 - Cliente HTTP para REST API

---

## 📞 Contacto y Soporte

Para preguntas o soporte:
- Revisa la documentación en los archivos MD
- Consulta los ejemplos en Apollo Playground
- Contacta al equipo de desarrollo

---

## 📄 Licencia

Este proyecto es parte de un trabajo académico para ULEAM - 5to Semestre - Aplicaciones para el Servidor Web.
