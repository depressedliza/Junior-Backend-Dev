import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

interface AccountingCreationAttrs {
    id: number;
    bookId: number;
    userId: number;
}

@Entity()
export class Accounting implements AccountingCreationAttrs {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("int")
    bookId: number;

    @Column("int")
    userId: number;
}