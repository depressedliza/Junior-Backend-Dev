import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends CreateUserDto {
    @ApiProperty({example: "314", description: "Id пользователя"})
    readonly id: number;
}