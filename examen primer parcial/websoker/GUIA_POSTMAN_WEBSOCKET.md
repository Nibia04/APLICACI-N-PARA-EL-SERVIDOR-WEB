# 📬 Pruebas WebSocket en Postman (Puerto 3001)

## 🚀 Pasos Iniciales

1. **Asegúrate que el WebSocket está corriendo:**
   ```powershell
   cd websoker
   npm start
   ```
   Deberías ver:
   ```
   🚀 WebSocket Server iniciado
   📍 Puerto: 3001
   📡 Esperando conexiones WebSocket...
   ```

2. **Abre Postman** e importa: `websoker/Postman_WebSocket.json`

3. **Abre el navegador** en: `http://localhost:3001/index.html`
   - Deberías ver "Conectado" en verde
   - El campo "Cliente ID" mostrará tu ID

---

## ✅ Prueba 1: Health Check

**Petición:** `GET http://localhost:3001/health`

```
GET /health HTTP/1.1
Host: localhost:3001
```

**Respuesta esperada (200 OK):**
```json
{
  "status": "ok",
  "puerto": 3001,
  "clientesConectados": 1,
  "eventosRecibidos": 0
}
```

**Si ves esto:** ✅ El servidor WebSocket está corriendo correctamente

---

## ✅ Prueba 2: Ver Clientes Conectados

**Petición:** `GET http://localhost:3001/clients`

```
GET /clients HTTP/1.1
Host: localhost:3001
```

**Respuesta esperada:**
```json
{
  "clientesConectados": 1,
  "ids": [
    "gCsq7A5bZxYwKl2m"
  ]
}
```

**Si ves esto:** ✅ El navegador está conectado por WebSocket

---

## ✅ Prueba 3: Ver Eventos Recibidos

**Petición:** `GET http://localhost:3001/events/log`

```
GET /events/log HTTP/1.1
Host: localhost:3001
```

**Respuesta esperada (al inicio):**
```json
[]
```

**Después de hacer POST (ver Prueba 4):** Los eventos aparecerán aquí

---

## 🎯 Prueba 4: Enviar Webhook POST - EVENTO CREATE

**¡ESTA ES LA PRUEBA MÁS IMPORTANTE!**

**Petición:** `POST http://localhost:3001/webhook/evento`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "id": "evento-123",
  "tipo": "eventos",
  "operacion": "CREATE",
  "datos": {
    "nombre": "Concierto Metallica",
    "artista": "Metallica",
    "fecha": "2025-12-15",
    "hora": "20:00",
    "precioBase": 150,
    "capacidadTotal": 5000
  },
  "timestamp": "2025-11-25T10:30:00Z"
}
```

**Pasos:**
1. Abre el navegador en `http://localhost:3001/index.html`
2. En Postman, **envía este POST**
3. **Mira el navegador** - Deberías ver:
   - ✅ Evento aparece en la lista
   - ✅ Tarjeta de evento con color NARANJA (eventos)
   - ✅ Dice "CREATE" en verde
   - ✅ Timestamp y datos del evento

**Respuesta esperada (200 OK):**
```json
{
  "ok": true,
  "mensaje": "Evento recibido",
  "clientsNotificados": 1,
  "evento": {
    "id": "evento-123",
    "tipo": "eventos",
    "operacion": "CREATE",
    ...
  }
}
```

---

## 🎯 Prueba 5: Enviar Webhook POST - UBICACIÓN CREATE

**Petición:** `POST http://localhost:3001/webhook/evento`

**Body:**
```json
{
  "id": "ubicacion-456",
  "tipo": "ubicaciones",
  "operacion": "CREATE",
  "datos": {
    "nombre": "Estadio Nacional",
    "ciudad": "Santiago",
    "pais": "Chile",
    "capacidad": 40000,
    "direccion": "Calle Principal 123"
  },
  "timestamp": "2025-11-25T10:35:00Z"
}
```

**En el navegador deberías ver:**
- ✅ Evento aparece con color AZUL (ubicaciones)
- ✅ Dice "CREATE" en verde

---

## 🎯 Prueba 6: Enviar Webhook POST - ASIENTO CREATE

**Petición:** `POST http://localhost:3001/webhook/evento`

**Body:**
```json
{
  "id": "asiento-789",
  "tipo": "asientos",
  "operacion": "CREATE",
  "datos": {
    "fila": "A",
    "numero": 1,
    "precio": 50,
    "eventoId": "evento-123"
  },
  "timestamp": "2025-11-25T10:40:00Z"
}
```

**Color esperado:** MORADO (asientos)

---

## 🎯 Prueba 7: Enviar Webhook POST - TIPO ENTRADA CREATE

**Petición:** `POST http://localhost:3001/webhook/evento`

**Body:**
```json
{
  "id": "tipoentrada-321",
  "tipo": "tipos-entrada",
  "operacion": "CREATE",
  "datos": {
    "nombre": "General",
    "descripcion": "Entrada General",
    "precio": 50,
    "cantidad": 1000,
    "eventoId": "evento-123"
  },
  "timestamp": "2025-11-25T10:45:00Z"
}
```

**Color esperado:** AMARILLO (tipos-entrada)

---

## 🎯 Prueba 8: Enviar Webhook POST - COMPRA CREATE

**Petición:** `POST http://localhost:3001/webhook/evento`

**Body:**
```json
{
  "id": "compra-654",
  "tipo": "compras",
  "operacion": "CREATE",
  "datos": {
    "usuarioId": "user-123",
    "eventoId": "evento-123",
    "metodoPago": "tarjeta_credito",
    "total": 150,
    "asientoIds": []
  },
  "timestamp": "2025-11-25T10:50:00Z"
}
```

**Color esperado:** ROJO (compras)

---

## 🎯 Prueba 9: UPDATE - Actualizar Evento

**Petición:** `POST http://localhost:3001/webhook/evento`

**Body:**
```json
{
  "id": "evento-123",
  "tipo": "eventos",
  "operacion": "UPDATE",
  "datos": {
    "nombre": "Concierto Metallica - ACTUALIZADO",
    "artista": "Metallica",
    "fecha": "2025-12-20",
    "hora": "21:00",
    "precioBase": 200
  },
  "timestamp": "2025-11-25T10:55:00Z"
}
```

**En el navegador verás:**
- ✅ La tarjeta del evento se actualiza
- ✅ Un nuevo evento con operación "UPDATE" (badge AZUL)
- ✅ Datos nuevos mostrados

---

## 🎯 Prueba 10: DELETE - Eliminar Evento

**Petición:** `POST http://localhost:3001/webhook/evento`

**Body:**
```json
{
  "id": "evento-123",
  "tipo": "eventos",
  "operacion": "DELETE",
  "datos": null,
  "timestamp": "2025-11-25T11:00:00Z"
}
```

**En el navegador verás:**
- ✅ Un nuevo evento con operación "DELETE" (badge ROJO)
- ⚠️ El evento original se marca como eliminado

---

## 🌈 Colores por Tipo de Entidad

| Tipo | Color |
|------|-------|
| eventos | 🟠 Naranja |
| ubicaciones | 🔵 Azul |
| asientos | 🟣 Morado |
| tipos-entrada | 🟡 Amarillo |
| compras | 🔴 Rojo |

## 🎨 Operaciones por Badge

| Operación | Badge | Color |
|-----------|-------|-------|
| CREATE | CREATE | 🟢 Verde |
| UPDATE | UPDATE | 🔵 Azul |
| DELETE | DELETE | 🔴 Rojo |

---

## 📋 Orden Recomendado de Pruebas

1. ✅ **Health Check** - Verifica servidor corriendo
2. ✅ **Ver Clientes** - Verifica navegador conectado
3. ✅ **Prueba 4** - POST evento (MAIN TEST)
4. ✅ **Prueba 5-8** - POST otros tipos
5. ✅ **Prueba 9** - UPDATE
6. ✅ **Prueba 10** - DELETE
7. ✅ **Ver Eventos Recibidos** - Confirma todos en /events/log

---

## ❌ Solución de Problemas

| Problema | Solución |
|----------|----------|
| Health devuelve error | ¿Está corriendo `npm start` en websoker? |
| Clientes = 0 | Abre `http://localhost:3001/index.html` en navegador |
| POST devuelve error | Checa que el JSON es válido (usa Postman formatter) |
| Navegador no actualiza | F5 para refrescar, checa consola F12 |
| Puerto 3001 en uso | `Get-Process node \| Stop-Process -Force` |

---

## 🔧 Cuando Funciona Correctamente

**La prueba es exitosa cuando:**

```
1. ✅ Health Check devuelve 200 OK
2. ✅ Ver Clientes muestra 1+ cliente
3. ✅ Navegador en localhost:3001 dice "Conectado"
4. ✅ POST /webhook/evento devuelve 200 OK con clientsNotificados: 1
5. ✅ Evento aparece en tiempo real en navegador
6. ✅ GET /events/log muestra el evento guardado
7. ✅ Todos los colores coinciden con el tipo
8. ✅ UPDATE y DELETE funcionan (nuevas entradas en log)
```

Si todo esto pasa = **¡Sistema funcionando perfectamente!** 🎉
