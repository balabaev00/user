import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModelDefinition } from './entity';
import { UserMapper } from './mappers';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
    imports: [
        MongooseModule.forFeature([UserModelDefinition]),
    ],
    controllers: [UserController],
    providers: [
        UserService,
        UserRepository,
        UserMapper,
    ],
})
export class UserModule { }
