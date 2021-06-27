import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

interface UserCreationAttrs {
    id: number;
    name: string;
    email: string;
    isSub: boolean;
}

@Entity()
export class User implements UserCreationAttrs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", {length: 20})
  name: string;

  @Column("varchar", {length: 20})
  email: string;

  @Column({ default: false })
  isSub: boolean; 

}