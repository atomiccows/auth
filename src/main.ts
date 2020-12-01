import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.setGlobalPrefix('api');

    const options = new DocumentBuilder()
        .setTitle('Coop Digital')
        .setDescription('')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs', app, document);

    await app.listen(process.env.AUTH_PORT);
    console.log(process.env.AUTH_PORT);
  } catch (e) {
    console.debug(e);
  }

}
bootstrap();
