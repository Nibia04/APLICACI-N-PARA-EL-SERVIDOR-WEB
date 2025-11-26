const express = require('express');
const { Server } = require('socket.io');
const cors = require('cors');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

// Middleware
app.use(express.json());
app.use(cors());

const PORT = 3001;
let connectedClients = new Set();
let eventLog = [];

// ============ WebSocket ============
io.on('connection', (socket) => {
    connectedClients.add(socket.id);
    console.log(`\n✅ Cliente WebSocket conectado: ${socket.id}`);
    console.log(`📊 Total de clientes: ${connectedClients.size}`);

    // Notificar a todos que hay una nueva conexión
    io.emit('cliente:conectado', {
        clienteId: socket.id,
        timestamp: new Date(),
        clientesConectados: connectedClients.size,
    });

    socket.on('disconnect', () => {
        connectedClients.delete(socket.id);
        console.log(`❌ Cliente desconectado: ${socket.id}`);
        console.log(`📊 Total de clientes: ${connectedClients.size}`);

        io.emit('cliente:desconectado', {
            clienteId: socket.id,
            timestamp: new Date(),
            clientesConectados: connectedClients.size,
        });
    });
});

// ============ Endpoints HTTP ============

/**
 * Ruta raíz - Servir index.html
 */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

/**
 * Endpoint que recibe las notificaciones del webhook REST
 * POST /webhook/evento
 * 
 * Flujo:
 * 1. REST hace POST a este endpoint (via webhook)
 * 2. WebSocket recibe y emite a los clientes conectados
 */
app.post('/webhook/evento', (req, res) => {
    const evento = req.body;

    console.log('\n========================================');
    console.log('🔗 WEBHOOK RECIBIDO EN WEBSOCKET');
    console.log('========================================');
    console.log('Evento:', evento);
    console.log(`📊 Clientes conectados: ${connectedClients.size}`);

    // Guardar en log
    eventLog.push({
        ...evento,
        recibirEn: new Date(),
    });

    // Emitir a TODOS los clientes WebSocket conectados
    io.emit('evento:nuevo', evento);

    console.log(`📤 Emitiendo a ${connectedClients.size} clientes...`);

    // Responder al REST
    res.json({
        success: true,
        mensaje: 'Evento recibido y emitido a clientes WebSocket',
        clientesNotificados: connectedClients.size,
        timestamp: new Date(),
    });
});

/**
 * GET /events/log - Ver historial de eventos
 */
app.get('/events/log', (req, res) => {
    res.json({
        total: eventLog.length,
        eventos: eventLog,
    });
});

/**
 * GET /clients - Ver clientes conectados
 */
app.get('/clients', (req, res) => {
    res.json({
        clientesConectados: connectedClients.size,
        ids: Array.from(connectedClients),
        timestamp: new Date(),
    });
});

/**
 * GET /health - Health check
 */
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        puerto: PORT,
        clientesConectados: connectedClients.size,
        eventosRecibidos: eventLog.length,
    });
});

// ============ Iniciar servidor ============
server.listen(PORT, () => {
    console.log('\n════════════════════════════════════════');
    console.log('🚀 WebSocket Server iniciado');
    console.log(`📍 Puerto: ${PORT}`);
    console.log(`🌐 URL: http://localhost:${PORT}`);
    console.log('════════════════════════════════════════\n');
    console.log('📡 Esperando conexiones WebSocket...\n');
});
