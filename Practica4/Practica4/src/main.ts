import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitar CORS
  app.enableCors();
  
  // Prefijo global para la API (excluyendo rutas raíz)
  app.setGlobalPrefix('api/v1', {
    exclude: ['', 'api/v1'],
  });
  
  // Configuración global de validación
  app.useGlobalPipes(new ValidationPipe({
    forbidNonWhitelisted: true,
    whitelist: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }));
  
  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 Aplicación ejecutándose en: http://localhost:${process.env.PORT ?? 3000}`);
  console.log(`📚 API disponible en: http://localhost:${process.env.PORT ?? 3000}/api/v1`);
}
bootstrap();
