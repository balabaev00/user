import { ValidationPipe, VERSION_NEUTRAL, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';

import { Stage, validatorConfig } from '@r1-backend/utils';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule, {
        bufferLogs: true,
    });
    const logger = app.get(Logger);
    const configService = app.get(ConfigService);

    app.useLogger(logger);
    app.enableCors();
    app.enableShutdownHooks();
    app.useGlobalPipes(new ValidationPipe(validatorConfig));

    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: VERSION_NEUTRAL,
    });

    if (process.env.STAGE !== Stage.Production) {
        const config = new DocumentBuilder()
            .setTitle('Esia')
            .setDescription('Сервис для взаимодействия с госуслугами')
            .setVersion('1.0')
            .build();

        const document = SwaggerModule.createDocument(app, config);

        SwaggerModule.setup(
            'docs',
            app,
            document,
            {
                customCss: `
                  /** Предотвращение прыгания кнопки копирования url'а */
                  .swagger-ui .opblock .opblock-summary .view-line-link.copy-to-clipboard {
                      margin: 0 5px;
                      width: 24px;
                  }
                  `,
            }
        );
    }

    const applicationPort = configService.get('CONTAINER_PORT') || 3000;
    await app.listen(applicationPort);
    logger.log(`Application running on port ${applicationPort}`);
}

bootstrap();
