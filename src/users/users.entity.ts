import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", {length: 20})
  name: string;

  @Column("varchar", {length: 20})
  email: string;

  @Column({ default: false })
  isSub: boolean; 

}