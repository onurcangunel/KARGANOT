import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global prefix
  app.setGlobalPrefix('api/v1');

  // CORS
  // Production CORS origins
  const allowedOrigins = [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    'https://karganot.com',
    'https://www.karganot.com',
  ];
  app.enableCors({
    origin: (origin, cb) => {
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error('Not allowed by CORS'));
    },
    credentials: true,
  });

  // Validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('KARGA NOT API')
    .setDescription('Türkiye Not Paylaşım Platformu API Documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth', 'Authentication endpoints')
    .addTag('users', 'User management')
    .addTag('universities', 'University data')
    .addTag('notes', 'Note management')
    .addTag('purchases', 'Purchase operations')
    .addTag('payments', 'Payment processing')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 4000;
  await app.listen(port);

  console.log(`
    🚀 KARGA NOT API is running!
    
    📝 API: http://localhost:${port}/api/v1
    📚 Docs: http://localhost:${port}/api/docs
    🗄️  Database: ${process.env.DATABASE_URL ? '✅ Connected' : '❌ Not configured'}
  `);
}

bootstrap();
