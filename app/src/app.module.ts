import { createLoggerConfig } from '@configs/logger.config';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HealthModule } from '@system/health/health.module';
import { MetricModule } from '@system/metric/metric.module';
import { LoggerModule } from 'nestjs-pino';

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
        HealthModule,
        MetricModule,
    ],
})
export class AppModule { }
