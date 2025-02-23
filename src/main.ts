import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(process.env.CLIENT_URL);
  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        'https://happ3n.vercel.app',
        'http://localhost:5173',
        process.env.CLIENT_URL,
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.useGlobalFilters(new HttpExceptionFilter());
  const config = new DocumentBuilder()
    .setTitle('Happ3n API')
    .setDescription('The API documentation for Happ3n backend')
    .setVersion('1.0')
    .addTag(
      'Happen3n',
      'A site web where you can find events, channels and hubs',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
