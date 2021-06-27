import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
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
    async getUser(@Param('id') id: number): Promise<any>{
        return this.usersService.getUser(id)
    }

    @ApiOperation({summary: 'Удаление пользователя по id'})
    @ApiResponse({status: 200, type: String})
    @Delete(':id/delete')
    async deleteUser(@Param('id') id: number): Promise<string>{
        return this.usersService.deleteUser(id)
    }

    @ApiOperation({summary: 'Обновление данных пользователя'})
    @ApiResponse({status: 200, type: String})
    @Put()
    async updateUser(@Body() userData: UpdateUserDto): Promise<string>{
        return this.usersService.updateUser(userData)
    }

    @ApiOperation({summary: 'Выдача абонемента пользователю'})
    @ApiResponse({status: 200, type: String})
    @Put(':id/sub')
    async getSubscription(@Param('id') id: number): Promise<string>{
        return this.usersService.getSubscription(id);
    }
    
}
