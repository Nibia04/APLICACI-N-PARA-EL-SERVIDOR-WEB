import { Controller, Inject } from '@nestjs/common';
import {
  EventPattern,
  Payload,
  Ctx,
  RmqContext,
  ClientProxy,
} from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid';
import { IdempotencyGuard } from '../idempotency/idempotency.guard';
import { OrderService } from './order.service';
import { OrderCreatedEvent } from '../events/order-created.event';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly idempotencyGuard: IdempotencyGuard,
    private readonly orderService: OrderService,
    @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy,
    @Inject('WEBHOOK_PUBLISHER') private readonly webhookClient: ClientProxy,
  ) {}

  @EventPattern('order.request')
  async handleOrderRequest(@Payload() payload: any, @Ctx() context: RmqContext) {
    console.log('\n📥 Procesando order.request...');
    console.log(`   Message ID: ${payload.message_id}`);
    console.log(`   Producto ID: ${payload.data.idProducto}, Cantidad: ${payload.data.cantidad}`);

    const channel = context.getChannelRef();
    const msg = context.getMessage();

    try {
      // IDEMPOTENCIA: Ejecutar handler solo si el message_id es nuevo
      await this.idempotencyGuard.run(payload.message_id, async () => {
        // Crear la orden
        const order = await this.orderService.createOrder(payload.data);

        // Emitir evento para actualizar stock del producto
        this.client.emit('order.created', {
          idProducto: payload.data.idProducto,
          cantidad: payload.data.cantidad,
          orderId: order.idOrden,
        });

        console.log('✅ Orden creada y evento emitido a ms-product');

        // NUEVO: Emitir evento webhook
        const webhookEvent: OrderCreatedEvent = {
          event_id: uuidv4(),
          event_type: 'order.created',
          timestamp: new Date().toISOString(),
          idempotency_key: payload.message_id,
          payload: {
            order_id: order.idOrden,
            product_id: order.idProducto,
            quantity: order.cantidad,
            total: order.total,
            created_at: order.fechaOrden.toISOString(),
          },
        };

        this.webhookClient.emit('webhook.publish', webhookEvent);
        
        console.log('📤 Evento webhook emitido:', webhookEvent.event_id);
      });

      // Confirmar mensaje (ACK)
      channel.ack(msg);
    } catch (error) {
      console.error('❌ Error procesando orden:', error.message);
      // ACK incluso si falla para evitar reintentos infinitos
      // En producción, usar Dead Letter Queue
      channel.ack(msg);
    }
  }
}
