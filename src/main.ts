import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SocketAdapter } from './socket/socket.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useWebSocketAdapter(new SocketAdapter(app));
  await app.listen(3000);
}
bootstrap();
