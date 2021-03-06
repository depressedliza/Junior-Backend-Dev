import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';

@Module({
    imports: [TypeOrmModule.forRoot(), ConfigModule.forRoot({
        envFilePath: '.env'
    }), UsersModule, BooksModule],
    controllers: [],
    providers: []
})
export class AppModule{

}