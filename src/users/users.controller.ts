import { AddBookDto } from './dto/add-book.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Body, Controller, Delete, Get, Param, Post, Put, HttpException } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Работа с пользователями')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}

    @ApiOperation({summary: 'Создание пользователя'})
    @ApiResponse({status: 200, type: User})
    @Post()
    async create(@Body() userDto: CreateUserDto){
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
    async getUser(@Param('id') id: number){
        return this.usersService.getUser(id)
    }

    @ApiOperation({summary: 'Удаление пользователя по id'})
    @ApiResponse({status: 200, type: HttpException})
    @Delete(':id/delete')
    async deleteUser(@Param('id') id: number){
        return this.usersService.deleteUser(id)
    }

    @ApiOperation({summary: 'Обновление данных пользователя'})
    @ApiResponse({status: 200, type: HttpException})
    @Put()
    async updateUser(@Body() userData: UpdateUserDto){
        return this.usersService.updateUser(userData)
    }

    @ApiOperation({summary: 'Выдача абонемента пользователю'})
    @ApiResponse({status: 200, type: HttpException})
    @Put(':id/sub')
    async getSubscription(@Param('id') id: number){
        return this.usersService.getSubscription(id);
    }

    @ApiOperation({summary: 'Добавление книги на аккаунт'})
    @ApiResponse({status: 200, type: HttpException})
    @Put('/add-book')
    async addBookToUser(@Body() data: AddBookDto){
        return this.usersService.addBookToUser(data)
    }
}
