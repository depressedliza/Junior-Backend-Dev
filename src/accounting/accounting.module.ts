import { User } from './../users/users.entity';
import { Accounting } from './accounting.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AccountingService } from './accounting.service';
import { AccountingController } from './accounting.controller';
import { Book } from 'src/books/books.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Accounting]), TypeOrmModule.forFeature([Book]), TypeOrmModule.forFeature([User])],
  providers: [AccountingService],
  controllers: [AccountingController]
})
export class AccountingModule {}
