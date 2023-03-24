import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const PORT = process.env.PORT_APP || 5600;
	const app = await NestFactory.create(AppModule);
	app.enableCors();
	const config = new DocumentBuilder().setTitle('Schedule trains').setDescription('RestApi').setVersion('1.0.0').addTag('Kevych Solutions').build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('/docs', app, document);
	app.setGlobalPrefix('api');
	await app.listen(PORT, () => console.log(`Server has been started on port = ${PORT}`));
}
bootstrap();
