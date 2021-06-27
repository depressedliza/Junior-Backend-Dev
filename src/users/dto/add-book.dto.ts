import { ApiProperty } from "@nestjs/swagger";

export class AddBookDto  {
    @ApiProperty({example: 1, description: "Id пользователя"})
    readonly userId: number;

    @ApiProperty({example: 2, description: "Id книги"})
    readonly bookId: number;
}