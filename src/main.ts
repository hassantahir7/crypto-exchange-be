import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Allow CORS from all origins
  app.enableCors();

  // Use port from environment variable or default to 3000
  const port = process.env.PORT || 3001; // Default to 3000 if PORT is not set

  await app.listen(port);
}
bootstrap();
