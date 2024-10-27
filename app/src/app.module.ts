import { createLoggerConfig } from '@configs/logger.config';
import { createMongoConfig } from '@configs/mongo.config';
import { UserModule } from '@features/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthModule } from '@system/health/health.module';
import { MetricModule } from '@system/metric/metric.module';
import { Logger, LoggerModule } from 'nestjs-pino';

@Module({
    imports: [
        ConfigModule.forRoot(
            {
                ignoreEnvFile: process.env.STAGE !== 'local',
                expandVariables: true,
                isGlobal: true,
            }
        ),
        LoggerModule.forRootAsync({
            useFactory: createLoggerConfig,
            inject: [ConfigService],
        }),
        MongooseModule.forRootAsync({
            inject: [ConfigService, Logger],
            useFactory: createMongoConfig,
        }),
        HealthModule,
        MetricModule,
        UserModule,
    ],
})
export class AppModule { }
