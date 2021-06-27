import { ApiProperty } from "@nestjs/swagger";

export class CreateBookDto {
    @ApiProperty({example: 'Brave new World', description: 'Название книги'})
    readonly nameBook: string;

    @ApiProperty({example: 'Fedor Dostaevsky', description: 'Имя автора'})
    readonly author: string;
}