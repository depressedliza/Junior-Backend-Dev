import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { AccountingModule } from './accounting/accounting.module';

@Module({
    imports: [TypeOrmModule.forRoot(), ConfigModule.forRoot({
        envFilePath: '.env'
    }), UsersModule, BooksModule, AccountingModule],
    controllers: [],
    providers: []
})
export class AppModule{

}