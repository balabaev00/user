import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDefined, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({
        example: 'Иван',
        description: 'Имя пользователя',
        type: String,
    })
    @IsDefined()
    @IsString()
    @Expose()
    firstName!: string;

    @ApiPropertyOptional({
        example: 'Иванов',
        description: 'Фамилия пользователя',
        type: String,
    })
    @IsDefined()
    @IsOptional()
    @Expose()
    lastName?: string;
}
