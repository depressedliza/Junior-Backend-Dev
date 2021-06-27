import { User } from './users.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Работа с пользователями')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}

    @ApiOperation({summary: 'Создание пользователя'})
    @ApiResponse({status: 200, type: User})
    @Post()
    async create(@Body() userDto: CreateUserDto): Promise<User>{
        return  this.usersService.createUser(userDto)
    }

    @ApiOperation({summary: 'Получение всех пользователей'})
    @ApiResponse({status: 200, type: [User]})
    @Get()
    async getAll(): Promise<User[]> {
        return this.usersService.getAllUsers()
    }

    @ApiOperation({summary: 'Получение конкретного пользователя по id'})
    @ApiResponse({status: 200, type: User})
    @Get(':id')
    async getUser(@Param() id: number): Promise<User>{
        return this.usersService.getUser(id)
    }

    @ApiOperation({summary: 'Удаление пользователя по id'})
    @ApiResponse({status: 200, type: String})
    @Delete(':id')
    async deleteUser(@Param() id: number): Promise<string>{
        return this.usersService.deleteUser(id)
    }

    
}
