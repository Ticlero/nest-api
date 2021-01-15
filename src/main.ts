import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //서버에서 유효성 검증을 하지 않는 properties가 요청될 경우 무시한다. decorator가 없는  property는 무시
      forbidNonWhitelisted: true, // 버에서 유효성 검증을 하지 않는 properties가 요청될 경우 전송 요청 자체를 막음. forbid 오류
      transform: true, //사용자로부터 들어오는 타입을 실제 원하는 타입으로 변경시켜 줌
    }),
  );
  await app.listen(3000);
}
bootstrap();
