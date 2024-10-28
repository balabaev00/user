import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { CreateUserDto, UserDto } from './dto';
import { UserService } from './user.service';

@ApiTags('Пользователи')
@Controller({
    path: 'user',
    version: '1',
})
export class UserController {
    constructor(private readonly service: UserService) { }

    @Post()
    @ApiCreatedResponse({ type: UserDto })
    create(@Body() dto: CreateUserDto): Promise<UserDto> {
        return this.service.create(dto);
    }
}
