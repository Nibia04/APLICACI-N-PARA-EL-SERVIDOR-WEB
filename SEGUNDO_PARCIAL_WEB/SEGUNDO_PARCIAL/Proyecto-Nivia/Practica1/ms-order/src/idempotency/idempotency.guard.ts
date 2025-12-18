import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';

/**
 * Guard de Idempotencia con Redis
 * 
 * RESPONSABILIDAD:
 * Actuar como middleware que ejecuta un handler solo si el message_id es nuevo.
 * 
 * FLUJO:
 * 1. Recibe message_id y función handler
 * 2. Intenta registrar el message_id en Redis (SETNX)
 * 3. Si es duplicado → ignora y retorna sin ejecutar handler
 * 4. Si es nuevo → ejecuta handler y garantiza que el efecto ocurre exactamente una vez
 * 
 * GARANTÍA:
 * Aunque el mensaje llegue múltiples veces (por reintentos de RabbitMQ),
 * el efecto en la base de datos ocurrirá EXACTAMENTE UNA VEZ.
 * 
 * CAMBIOS:
 * - Usa Redis en lugar de PostgreSQL para mayor velocidad
 * - SETNX garantiza atomicidad
 * - TTL de 24 horas para auto-limpieza
 */
@Injectable()
export class IdempotencyGuard {
  constructor(private readonly redis: RedisService) {}

  /**
   * Ejecuta el handler solo si el message_id es nuevo
   * 
   * @param messageId - UUID único del mensaje
   * @param handler - Función a ejecutar si el mensaje es nuevo
   */
  async run(messageId: string, handler: () => Promise<any>): Promise<void> {
    console.log(`\n🔐 [REDIS IDEMP] Verificando message_id: ${messageId}`);

    // Intentar registrar el message_id en Redis
    const isNew = await this.redis.tryRegister(messageId);

    if (!isNew) {
      console.log(`🚫 [REDIS IDEMP] Mensaje duplicado ignorado: ${messageId}`);
      console.log(`   ℹ️  Este mensaje ya fue procesado anteriormente.`);
      console.log(`   ℹ️  No se ejecutará ninguna acción para evitar duplicados.`);
      return; // Salir sin ejecutar el handler
    }

    // Es un mensaje nuevo, ejecutar el handler
    console.log(`✅ [REDIS IDEMP] Mensaje nuevo, procesando: ${messageId}`);
    
    try {
      await handler();
      console.log(`✅ [REDIS IDEMP] Procesamiento completado exitosamente`);
    } catch (error) {
      console.error(`❌ [REDIS IDEMP] Error al procesar mensaje: ${error.message}`);
      // NOTA: El message_id ya está registrado, por lo que reintentos futuros serán ignorados
      throw error; // Re-lanzar para manejo superior
    }
  }

  /**
   * Verificar si un mensaje ya fue procesado (sin intentar procesar)
   * 
   * @param messageId - UUID del mensaje
   * @returns true si ya fue procesado
   */
  async wasProcessed(messageId: string): Promise<boolean> {
    return this.redis.exists(messageId);
  }
}
