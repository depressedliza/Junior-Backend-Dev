import { ApiProperty } from "@nestjs/swagger";


export class CreateUserDto{
    @ApiProperty({example: "username", description: "Имя пользователя"})
    readonly name: string;

    @ApiProperty({example: "user@email.com", description: "Почтовый адрес"})
    readonly email: string;
}