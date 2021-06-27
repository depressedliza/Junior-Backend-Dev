import { User } from './users.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Book } from 'src/books/books.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Book])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
