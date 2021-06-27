import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
    imports: [TypeOrmModule.forRoot(), UsersModule, ConfigModule.forRoot({
        envFilePath: '.env'
    })],
    controllers: [],
    providers: []
})
export class AppModule{

}