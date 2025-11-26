# 📬 Guía de Pruebas en Postman

## ✅ Requisitos Previos

1. **Ambos servidores deben estar corriendo:**
   ```powershell
   # Terminal 1 - REST (puerto 3000)
   cd REST
   npm run start:dev
   
   # Terminal 2 - WebSocket (puerto 3001)
   cd websoker
   npm start
   ```

2. **Abrir Postman** e importar la colección: `Postman_Collection.json`

---

## 🧪 Prueba 1: Verificar que REST está funcionando

**Petición:** `GET http://localhost:3000/eventos`

```
GET /eventos HTTP/1.1
Host: localhost:3000
```

**Resultado esperado:**
```json
{
  "ok": true,
  "eventos": []
}
```

---

## 🧪 Prueba 2: Crear un Evento (¡Esto dispara el Webhook!)

**Petición:** `POST http://localhost:3000/eventos`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "nombre": "Concierto Metallica",
  "artista": "Metallica",
  "fecha": "2025-12-15",
  "hora": "20:00",
  "imagen": null,
  "precioBase": 150,
  "capacidadTotal": 5000,
  "ubicacionId": "loc-001"
}
```

**Resultado esperado:**
```json
{
  "ok": true,
  "evento": {
    "id": "uuid-aqui",
    "nombre": "Concierto Metallica",
    "artista": "Metallica",
    ...
  }
}
```

**IMPORTANTE:** Cuando recibas este 200 OK:
1. **Copia el ID del evento** (lo necesitarás después)
2. Ve a la pestaña del navegador con `http://localhost:3001/index.html`
3. **Deberías ver el evento aparecer en TIEMPO REAL** 🎉

---

## 🧪 Prueba 3: Verificar que WebSocket recibió el evento

**Petición:** `GET http://localhost:3001/events/log`

```
GET /events/log HTTP/1.1
Host: localhost:3001
```

**Resultado esperado:**
```json
[
  {
    "id": "uuid-aqui",
    "tipo": "eventos",
    "operacion": "CREATE",
    "datos": {
      "nombre": "Concierto Metallica",
      ...
    },
    "timestamp": "2025-11-25T10:30:00Z"
  }
]
```

Si esto devuelve un array vacío `[]`, significa que **el webhook NO está llegando al WebSocket**.

---

## 🧪 Prueba 4: Crear una Ubicación

**Petición:** `POST http://localhost:3000/ubicaciones`

**Body:**
```json
{
  "nombre": "Estadio Nacional",
  "ciudad": "Santiago",
  "pais": "Chile",
  "latitud": -33.45,
  "longitud": -70.45,
  "capacidad": 40000,
  "direccion": "Calle Principal 123"
}
```

**Resultado esperado:**
- ✅ 201 Created
- ✅ Evento aparece en `http://localhost:3001/index.html`
- ✅ Evento aparece en `http://localhost:3001/events/log`

---

## 🧪 Prueba 5: Crear un Tipo de Entrada

**Petición:** `POST http://localhost:3000/tipos-entrada`

**Body:**
```json
{
  "nombre": "General",
  "descripcion": "Entrada General",
  "precio": 50,
  "cantidad": 1000,
  "eventoId": "PEGA_ID_DEL_EVENTO_AQUI"
}
```

---

## 🧪 Prueba 6: Crear un Asiento

**Petición:** `POST http://localhost:3000/asientos`

**Body:**
```json
{
  "fila": "A",
  "numero": 1,
  "precio": 50,
  "eventoId": "PEGA_ID_DEL_EVENTO_AQUI",
  "tipoEntradaId": "opcional"
}
```

---

## 🧪 Prueba 7: Crear una Compra

**Petición:** `POST http://localhost:3000/compras`

**Body:**
```json
{
  "usuarioId": "user-123",
  "eventoId": "PEGA_ID_DEL_EVENTO_AQUI",
  "metodoPago": "tarjeta_credito",
  "asientoIds": []
}
```

---

## 🧪 Prueba 8: Actualizar un Evento (UPDATE)

**Petición:** `PUT http://localhost:3000/eventos/ID_AQUI`

**Body:**
```json
{
  "nombre": "Concierto Metallica - ACTUALIZADO",
  "artista": "Metallica",
  "fecha": "2025-12-20",
  "hora": "21:00",
  "precioBase": 200
}
```

**Resultado esperado:**
- ✅ Evento ACTUALIZADO en el navegador en tiempo real
- ✅ Evento con tipo "UPDATE" en `http://localhost:3001/events/log`

---

## 🧪 Prueba 9: Eliminar un Evento (DELETE)

**Petición:** `DELETE http://localhost:3000/eventos/ID_AQUI`

**Resultado esperado:**
- ✅ Evento ELIMINADO en el navegador en tiempo real
- ✅ Evento con tipo "DELETE" en `http://localhost:3001/events/log`

---

## 📊 Health Checks

### Verificar REST:
```
GET http://localhost:3000/eventos
```
Debe devolver 200 OK

### Verificar WebSocket:
```
GET http://localhost:3001/health
```
Debe devolver:
```json
{
  "status": "ok",
  "puerto": 3001,
  "clientesConectados": 1,
  "eventosRecibidos": 5
}
```

---

## ❌ Solución de Problemas

| Problema | Solución |
|----------|----------|
| GET /eventos devuelve error | ¿Está corriendo REST en puerto 3000? |
| POST /eventos devuelve 500 | Revisar terminal de REST para errores |
| /events/log está vacío | El webhook NO está llegando. Revisar webhook.service.ts |
| Navegador no muestra eventos | El WebSocket no está conectado. Ver consola F12 |
| Puerto 3000 ya en uso | `Get-Process node \| Stop-Process -Force` |
| Puerto 3001 ya en uso | `Get-Process node \| Stop-Process -Force` |

---

## 📋 Flujo Completo Esperado

```
1. Postman: POST /eventos ✅
   ↓
2. REST recibe y valida ✅
   ↓
3. REST crea evento en memoria ✅
   ↓
4. webhookService.procesarCreacion() se ejecuta ✅
   ↓
5. HTTP POST a localhost:3001/webhook/evento ✅
   ↓
6. WebSocket recibe evento ✅
   ↓
7. socket.io emite "evento:nuevo" ✅
   ↓
8. Navegador recibe en tiempo real ✅
   ↓
9. Evento aparece en index.html ✅
```

Si algo falla, revisa qué paso está fallando y reporta. 🔧
