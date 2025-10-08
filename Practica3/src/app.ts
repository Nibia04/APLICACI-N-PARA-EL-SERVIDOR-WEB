import "reflect-metadata";
import { AppDataSource } from "./data-source.js";
import { UserService } from "./Domains/Usuario/UserService.js";
import { CategoriaService } from "./Domains/Categoria/CategoriaService.js";
import { EmprendedorService } from "./Domains/Emprendedor/EmprendedorService.js";
import { OrdenService } from "./Domains/Orden/OrdenService.js";
import { TarjetaVirtualService } from "./Domains/Tarjeta Virtual/TarjetaVirtualService.js";
import { CarritoCompraService } from "./Domains/CarritoCompra/CarritoCompraService.js";
import { ProductoService } from "./Domains/Producto/ProductoService.js";
import { PagoService } from "./Domains/Pago/PagoService.js";
import { DetalleCarroService } from "./Domains/DetalleCarro/DetalleCarroService.js";
import { DetalleOrdenService } from "./Domains/DetalleOrden/DetalleOrdenService.js";

AppDataSource.initialize().then(async () => {
    console.log("Conexión a la base de datos establecida correctamente");
    
    const userService = new UserService();
    const categoriaService = new CategoriaService();
    const emprendedorService = new EmprendedorService();
    const ordenService = new OrdenService();
    const tarjetaVirtualService = new TarjetaVirtualService();
    const carritoCompraService = new CarritoCompraService();
    const productoService = new ProductoService();
    const pagoService = new PagoService();
    const detalleCarroService = new DetalleCarroService();
    const detalleOrdenService = new DetalleOrdenService();

    try {
        console.log("=== PROBANDO ENTIDAD CARRITO COMPRA ===");
        
        const timestamp = Date.now();
        
        // Primero crear un usuario para el carrito
        const usuarioCarrito = await userService.createUser({
            nombre: "Luis",
            apellido: "Mendoza",
            email: `luis.mendoza.${timestamp}@productos.manta.com`,
            contraseña: "carrito123",
            direccion: "Centro Comercial Manta, Local 15",
            telefono: "0987555999",
            rol: "cliente"
        });
        console.log("Usuario para carrito creado:", usuarioCarrito);

        // Crear carritos de compra
        const carrito1 = await carritoCompraService.createCarritoCompra({
            idUsuario: usuarioCarrito.idUsuario
        });
        console.log("Primer carrito creado:", carrito1);

        // Intentar crear otro carrito para el mismo usuario (debería devolver el existente)
        const carrito2 = await carritoCompraService.createCarritoCompra({
            idUsuario: usuarioCarrito.idUsuario
        });
        console.log("Segundo carrito (debe ser el mismo):", carrito2);

        // Crear otro usuario para más carritos
        const usuarioCarrito2 = await userService.createUser({
            nombre: "Carmen",
            apellido: "Flores",
            email: `carmen.flores.${timestamp}@productos.manta.com`,
            contraseña: "carrito456",
            direccion: "Av. Malecón, Manta",
            telefono: "0987888111",
            rol: "cliente"
        });
        console.log("Segundo usuario creado:", usuarioCarrito2);

        const carrito3 = await carritoCompraService.createCarritoCompra({
            idUsuario: usuarioCarrito2.idUsuario
        });
        console.log("Tercer carrito creado:", carrito3);

        // Obtener todos los carritos
        const allCarritos = await carritoCompraService.getAllCarritos();
        console.log("\nTodos los carritos:", allCarritos);

        // Obtener carrito por usuario
        const carritoByUsuario = await carritoCompraService.getCarritoByUsuario(usuarioCarrito.idUsuario);
        console.log("\nCarrito del primer usuario:", carritoByUsuario);

        // Obtener o crear carrito para usuario
        const carritoOrCreate = await carritoCompraService.getOrCreateCarritoForUsuario(usuarioCarrito2.idUsuario);
        console.log("\nCarrito obtenido/creado:", carritoOrCreate);

        // Verificar si usuario tiene carrito activo
        const tieneCarritoActivo = await carritoCompraService.usuarioTieneCarritoActivo(usuarioCarrito.idUsuario);
        console.log("\n¿Usuario tiene carrito activo?:", tieneCarritoActivo);

        // Obtener carritos creados hoy
        const carritosHoy = await carritoCompraService.getCarritosCreatedToday();
        console.log("\nCarritos creados hoy:", carritosHoy);

        // Obtener carritos recientes (últimos 7 días)
        const carritosRecientes = await carritoCompraService.getCarritosRecientes(7);
        console.log("\nCarritos recientes:", carritosRecientes);

        // Obtener últimos carritos (limitado)
        const latestCarritos = await carritoCompraService.getLatestCarritos(5);
        console.log("\nÚltimos 5 carritos:", latestCarritos);

        // Obtener estadísticas de carritos
        const carritoStats = await carritoCompraService.getCarritoStats();
        console.log("\nEstadísticas de carritos:", carritoStats);

        // Obtener estadísticas por usuario
        const userCarritoStats = await carritoCompraService.getCarritoStatsByUsuario(usuarioCarrito.idUsuario);
        console.log("\nEstadísticas del primer usuario:", userCarritoStats);

        // Vaciar carrito de usuario
        await carritoCompraService.vaciarCarritoUsuario(usuarioCarrito2.idUsuario);
        console.log("\nCarrito del segundo usuario vaciado");

        console.log("\n=== PROBANDO ENTIDAD TARJETA VIRTUAL ===");
        
        // Crear tarjeta virtual
        const tarjeta1 = await tarjetaVirtualService.createTarjetaVirtual({
            idUsuario: usuarioCarrito.idUsuario,
            saldoDisponible: 750.00,
            estado: "activa"
        });
        console.log("Tarjeta virtual creada:", tarjeta1);

        console.log("\n=== PROBANDO ENTIDAD ORDEN ===");
        
        // Crear orden
        const orden1 = await ordenService.createOrden({
            idUsuario: usuarioCarrito.idUsuario,
            estado: "pendiente",
            total: 125.75
        });
        console.log("Orden creada:", orden1);

        console.log("\n=== PROBANDO ENTIDAD EMPRENDEDOR ===");
        
        // Crear emprendedor
        const emprendedor1 = await emprendedorService.createEmprendedor({
            nombreTienda: `Dulces Tradiciones Mantenses ${timestamp}`,
            descripcionTienda: "Dulces típicos y postres artesanales de Manabí - Nueva sucursal",
            rating: 4.9
        });
        console.log("Emprendedor creado:", emprendedor1);

        console.log("\n=== PROBANDO ENTIDAD CATEGORIA ===");
        
        // Crear categoría
        const categoria1 = await categoriaService.createCategoria({
            nombreCategoria: `Dulces y Postres ${timestamp}`,
            descripcion: "Dulces tradicionales y postres artesanales - Nueva categoría"
        });
        console.log("Categoría creada:", categoria1);

        console.log("\n=== PROBANDO ENTIDAD PRODUCTO ===");
        
        // Crear productos
        const producto1 = await productoService.createProducto({
            idVendedor: emprendedor1.idVendedor,
            nombreProducto: "Cocada Mantense",
            descripcion: "Deliciosa cocada tradicional de Manta con coco fresco",
            precio: 2.50,
            stock: 25,
            categoria: "Dulces Tradicionales",
            imagenURL: "https://example.com/cocada.jpg"
        });
        console.log("Primer producto creado:", producto1);

        const producto2 = await productoService.createProducto({
            idVendedor: emprendedor1.idVendedor,
            nombreProducto: "Melcocha de Guayaba",
            descripcion: "Melcocha artesanal con sabor a guayaba",
            precio: 3.75,
            stock: 15,
            categoria: "Dulces Tradicionales"
        });
        console.log("Segundo producto creado:", producto2);

        const producto3 = await productoService.createProducto({
            idVendedor: emprendedor1.idVendedor,
            nombreProducto: "Conserva de Papaya",
            descripcion: "Conserva casera de papaya en almíbar",
            precio: 5.00,
            stock: 8,
            categoria: "Conservas"
        });
        console.log("Tercer producto creado:", producto3);

        // Obtener todos los productos
        const todosProductos = await productoService.getAllProductos();
        console.log("\nTodos los productos:", todosProductos);

        // Buscar productos por vendedor
        const productosVendedor = await productoService.getProductosByVendedor(emprendedor1.idVendedor);
        console.log("\nProductos del emprendedor:", productosVendedor);

        // Buscar productos por categoría
        const productosDulces = await productoService.getProductosByCategoria("Dulces Tradicionales");
        console.log("\nProductos de dulces tradicionales:", productosDulces);

        // Buscar por rango de precio
        const productosBaratos = await productoService.getProductosByPriceRange(2.00, 4.00);
        console.log("\nProductos entre $2.00 y $4.00:", productosBaratos);

        // Productos en stock
        const productosEnStock = await productoService.getProductosInStock();
        console.log("\nProductos en stock:", productosEnStock);

        // Buscar por nombre
        const busquedaCocada = await productoService.searchProductosByName("cocada");
        console.log("\nBúsqueda 'cocada':", busquedaCocada);

        // Actualizar stock
        const productoStockActualizado = await productoService.updateStock(producto1.idProducto, 30);
        console.log("\nProducto con stock actualizado:", productoStockActualizado);

        // Reducir stock (simular venta)
        const productoVendido = await productoService.reduceStock(producto2.idProducto, 3);
        console.log("\nProducto después de venta (reducir 3 unidades):", productoVendido);

        // Aumentar stock (simular restock)
        const productoRestock = await productoService.increaseStock(producto3.idProducto, 5);
        console.log("\nProducto después de restock (+5 unidades):", productoRestock);

        // Obtener estadísticas
        const estadisticas = await productoService.getProductStatistics();
        console.log("\nEstadísticas de productos:", estadisticas);

        // Actualizar producto
        const productoActualizado = await productoService.updateProducto(producto1.idProducto, {
            precio: 2.75,
            descripcion: "Deliciosa cocada tradicional de Manta con coco fresco - NUEVA RECETA"
        });
        console.log("\nProducto actualizado:", productoActualizado);

        console.log("\n=== PROBANDO ENTIDAD PAGO ===");
        
        // Crear pagos para las órdenes
        const pago1 = await pagoService.createPago({
            idOrden: orden1.idOrden,
            monto: 125.75,
            metodoPago: "tarjeta_credito",
            estadoPago: "pendiente"
        });
        console.log("Primer pago creado:", pago1);

        const pago2 = await pagoService.createPago({
            idOrden: orden1.idOrden,
            monto: 50.00,
            metodoPago: "tarjeta_virtual",
            estadoPago: "completado",
            fechaPago: new Date('2025-10-06')
        });
        console.log("Segundo pago creado:", pago2);

        const pago3 = await pagoService.createPago({
            idOrden: orden1.idOrden,
            monto: 25.25,
            metodoPago: "transferencia",
            estadoPago: "fallido"
        });
        console.log("Tercer pago creado:", pago3);

        // Obtener todos los pagos
        const todosPagos = await pagoService.getAllPagos();
        console.log("\nTodos los pagos:", todosPagos);

        // Buscar pagos por orden
        const pagosPorOrden = await pagoService.getPagosByOrden(orden1.idOrden);
        console.log("\nPagos de la orden:", pagosPorOrden);

        // Buscar pagos por estado
        const pagosPendientes = await pagoService.getPagosByEstado("pendiente");
        console.log("\nPagos pendientes:", pagosPendientes);

        const pagosCompletados = await pagoService.getPagosByEstado("completado");
        console.log("\nPagos completados:", pagosCompletados);

        // Buscar pagos por método
        const pagosTarjeta = await pagoService.getPagosByMetodo("tarjeta_credito");
        console.log("\nPagos con tarjeta de crédito:", pagosTarjeta);

        // Buscar pagos por rango de monto
        const pagosRangoMonto = await pagoService.getPagosByMontoRange(20.00, 100.00);
        console.log("\nPagos entre $20.00 y $100.00:", pagosRangoMonto);

        // Buscar pagos por rango de fecha
        const fechaInicio = new Date('2025-10-01');
        const fechaFin = new Date('2025-10-31');
        const pagosPorFecha = await pagoService.getPagosByDateRange(fechaInicio, fechaFin);
        console.log("\nPagos del mes de octubre:", pagosPorFecha);

        // Buscar pago por hash
        const pagoPorHash = await pagoService.getPagoByHash(pago1.hashTransaccion);
        console.log("\nPago encontrado por hash:", pagoPorHash);

        // Procesar un pago pendiente
        const pagoProcessado = await pagoService.procesarPago(pago1.idPago);
        console.log("\nPago procesado:", pagoProcessado);

        // Actualizar un pago
        const pagoActualizado = await pagoService.updatePago(pago3.idPago, {
            estadoPago: "cancelado",
            metodoPago: "efectivo"
        });
        console.log("\nPago actualizado:", pagoActualizado);

        // Obtener estadísticas de pagos
        const estadisticasPagos = await pagoService.getPagoStatistics();
        console.log("\nEstadísticas de pagos:", estadisticasPagos);

        // Obtener pagos recientes
        const pagosRecientes = await pagoService.getPagosRecientes(5);
        console.log("\nÚltimos 5 pagos:", pagosRecientes);

        // Obtener ingresos por período
        const ingresosMes = await pagoService.getIngresosByPeriodo(fechaInicio, fechaFin);
        console.log(`\nIngresos del período ${fechaInicio.toDateString()} - ${fechaFin.toDateString()}:`, ingresosMes);

        // Cancelar un pago
        const nuevoPagoPendiente = await pagoService.createPago({
            idOrden: orden1.idOrden,
            monto: 15.75,
            metodoPago: "paypal",
            estadoPago: "pendiente"
        });
        
        const pagoCancelado = await pagoService.cancelarPago(nuevoPagoPendiente.idPago);
        console.log("\nPago cancelado:", pagoCancelado);

        console.log("\n=== PROBANDO ENTIDAD DETALLE CARRO ===");
        
        // Agregar productos al carrito
        const detalle1 = await detalleCarroService.agregarProductoAlCarrito({
            idCarrito: carrito1.idCarrito,
            idProducto: producto1.idProducto,
            cantidad: 3
        });
        console.log("Primer detalle agregado:", detalle1);

        const detalle2 = await detalleCarroService.agregarProductoAlCarrito({
            idCarrito: carrito1.idCarrito,
            idProducto: producto2.idProducto,
            cantidad: 2
        });
        console.log("Segundo detalle agregado:", detalle2);

        const detalle3 = await detalleCarroService.agregarProductoAlCarrito({
            idCarrito: carrito1.idCarrito,
            idProducto: producto3.idProducto,
            cantidad: 1
        });
        console.log("Tercer detalle agregado:", detalle3);

        // Intentar agregar el mismo producto (debe actualizar cantidad)
        const detalleActualizado = await detalleCarroService.agregarProductoAlCarrito({
            idCarrito: carrito1.idCarrito,
            idProducto: producto1.idProducto,
            cantidad: 2
        });
        console.log("Detalle actualizado (mismo producto):", detalleActualizado);

        // Obtener todos los detalles
        const todosDetalles = await detalleCarroService.getAllDetalles();
        console.log("\nTodos los detalles:", todosDetalles);

        // Obtener detalles por carrito
        const detallesPorCarrito = await detalleCarroService.getDetallesByCarrito(carrito1.idCarrito);
        console.log("\nDetalles del carrito:", detallesPorCarrito);

        // Obtener resumen del carrito
        const resumenCarrito = await detalleCarroService.getResumenCarrito(carrito1.idCarrito);
        console.log("\nResumen del carrito:", resumenCarrito);

        // Actualizar cantidad de un producto
        const cantidadActualizada = await detalleCarroService.actualizarCantidadProducto(
            carrito1.idCarrito, 
            producto2.idProducto, 
            4
        );
        console.log("\nCantidad actualizada:", cantidadActualizada);

        // Agregar productos a otro carrito
        await detalleCarroService.agregarProductoAlCarrito({
            idCarrito: carrito2.idCarrito,
            idProducto: producto1.idProducto,
            cantidad: 1
        });

        await detalleCarroService.agregarProductoAlCarrito({
            idCarrito: carrito2.idCarrito,
            idProducto: producto3.idProducto,
            cantidad: 2
        });

        // Obtener estadísticas de detalle carrito
        const estadisticasDetalle = await detalleCarroService.getDetalleCarroStatistics();
        console.log("\nEstadísticas de detalle carrito:", estadisticasDetalle);

        // Obtener productos más agregados
        const productosMasAgregados = await detalleCarroService.getProductosMasAgregados(5);
        console.log("\nProductos más agregados:", productosMasAgregados);

        // Obtener carritos con más items
        const carritosConMasItems = await detalleCarroService.getCarritosConMasItems(5);
        console.log("\nCarritos con más items:", carritosConMasItems);

        // Duplicar carrito
        const carritosDuplicados = await detalleCarroService.duplicarCarrito(
            carrito1.idCarrito, 
            carrito2.idCarrito
        );
        console.log("\nCarrito duplicado:", carritosDuplicados);

        // Obtener resumen del carrito duplicado
        const resumenCarritoDuplicado = await detalleCarroService.getResumenCarrito(carrito2.idCarrito);
        console.log("\nResumen carrito duplicado:", resumenCarritoDuplicado);

        // Eliminar un producto específico del carrito
        const productoEliminado = await detalleCarroService.eliminarProductoDelCarrito(
            carrito1.idCarrito, 
            producto3.idProducto
        );
        console.log("\nProducto eliminado del carrito:", productoEliminado);

        // Resumen final del carrito después de eliminación
        const resumenFinal = await detalleCarroService.getResumenCarrito(carrito1.idCarrito);
        console.log("\nResumen final del carrito:", resumenFinal);

        // Vaciar un carrito
        const carritoVaciado = await detalleCarroService.vaciarCarrito(carrito2.idCarrito);
        console.log("\nCarrito vaciado:", carritoVaciado);

        // ======= PRUEBAS DE DETALLE ORDEN =======
        console.log("\n=== PROBANDO ENTIDAD DETALLE ORDEN ===");
        
        // Crear algunos detalles de orden
        const detalleOrden1 = await detalleOrdenService.crearDetalleOrden(10, 7, 2, 2.75);
        console.log("Primer detalle creado:", detalleOrden1);
        
        const detalleOrden2 = await detalleOrdenService.crearDetalleOrden(10, 8, 1, 3.75);
        console.log("Segundo detalle creado:", detalleOrden2);
        
        const detalleOrden3 = await detalleOrdenService.crearDetalleOrden(10, 9, 3, 5.00);
        console.log("Tercer detalle creado:", detalleOrden3);
        
        // Agregar el mismo producto (debería sumar cantidades)
        const detalleOrdenActualizado = await detalleOrdenService.crearDetalleOrden(10, 7, 1, 2.75);
        console.log("Detalle actualizado (mismo producto):", detalleOrdenActualizado);
        
        // Obtener todos los detalles
        const todosLosDetallesOrden = await detalleOrdenService.obtenerTodosLosDetalles();
        console.log("\nTodos los detalles:", todosLosDetallesOrden);
        
        // Obtener detalles por orden
        const detallesPorOrden = await detalleOrdenService.obtenerDetallesPorOrden(10);
        console.log("\nDetalles de la orden 10:", detallesPorOrden);
        
        // Obtener resumen de orden
        const resumenOrden = await detalleOrdenService.obtenerResumenOrden(10);
        console.log("\nResumen de la orden:", resumenOrden);
        
        // Actualizar cantidad
        if (detallesPorOrden.length > 0) {
            const cantidadActualizada = await detalleOrdenService.actualizarCantidad(detalleOrdenActualizado.idDetalleOrden, 5);
            console.log("\nCantidad actualizada:", cantidadActualizada);
        }
        
        // Obtener productos más vendidos
        const productosMasVendidos = await detalleOrdenService.obtenerProductosMasVendidos();
        console.log("\nProductos más vendidos:", productosMasVendidos);
        
        // Obtener estadísticas
        const estadisticasDetalleOrden = await detalleOrdenService.obtenerEstadisticas();
        console.log("\nEstadísticas de detalle orden:", estadisticasDetalleOrden);
        
        // Duplicar orden
        const ordenDuplicada = await detalleOrdenService.duplicarOrden(10, 11);
        console.log("\nOrden duplicada:", ordenDuplicada);
        
        // Validar inventario
        const validacionInventario = await detalleOrdenService.validarInventarioOrden(10);
        console.log("\nValidación de inventario:", validacionInventario);
        
        // Calcular descuento por volumen
        const descuentoVolumen = await detalleOrdenService.calcularDescuentoPorVolumen(10, 15);
        console.log("\nDescuento por volumen (15%):", descuentoVolumen);
        
        // Generar facturación
        const facturacion = await detalleOrdenService.generarFacturacion(10);
        console.log("\nFacturación generada:", facturacion);

    } catch (error) {
        console.error("Error en operaciones:", error);
    }

}).catch(error => console.log("Error de conexión:", error));