import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/users.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


interface BookCreationAttrs {
    id: number;
    nameBook: string;
    author: string;
    existence: User;
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
    
    @ManyToOne(type => User, user => user.books)
    existence: User;
}