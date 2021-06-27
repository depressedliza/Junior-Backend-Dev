import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

interface UserCreationAttrs {
    id: number;
    name: string;
    email: string;
    isSub: boolean;
}

@Entity()
export class User implements UserCreationAttrs {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор пользователя'})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: 'username', description: 'Имя пользователя'})
    @Column("varchar", {length: 20})
    name: string;

    @ApiProperty({example: 'user@email.com', description: 'Почтовый адрес пользователя'})
    @Column("varchar", {length: 20})
    email: string;

    @ApiProperty({example: '0', description: 'Наличие абонемента'})
    @Column({ default: false })
    isSub: boolean; 

}