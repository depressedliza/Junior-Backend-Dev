import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


interface BookCreationAttrs {
    id: number;
    nameBook: string;
    author: string;
    existence: number;
}

@Entity()
export class Book implements BookCreationAttrs {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор книги'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: 'Brave new World', description: 'Название книги'})
    @Column("varchar", {length: 20})
    nameBook: string;

    @ApiProperty({example: 'Fedor Dostaevsky', description: 'Имя автора'})
    @Column("varchar", {length: 20})
    author: string;
    
    @ApiProperty({example: '0', description: 'Число указывающие местонахождение книги. Если 0 - в библиотеке, если отличное от 0, то у юзера с id равным этому числу'})
    @Column("int")
    existence: number;
}