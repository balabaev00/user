import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';

import { CreateUserDto, UserDto } from './dto';
import { UserService } from './user.service';

@Controller({
    path: 'user',
    version: '1',
})
export class UserController {
    constructor(private readonly service: UserService) { }

    @Post()
    @ApiCreatedResponse({ type: CreateUserDto })
    create(@Body() dto: CreateUserDto): Promise<UserDto> {
        return this.service.create(dto);
    }
}
