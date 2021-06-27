import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}

    @Post()
    async create(@Body() userDto: CreateUserDto){
        return  this.usersService.createUser(userDto)
    }

    @Get()
    async getAll() {
        return this.usersService.getAllUsers()
    }
}
