import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {

    }

    async createUser(user: CreateUserDto): Promise<User> {
        return await this.userRepository.save(user);
    }

    async getAllUsers(): Promise<User[]> {
        return await this.userRepository.find();
    }

    // async updateUser(): Promise<User> {
    //     return await this.userRepository
    // }

    async getUser (id: number): Promise<User> {
        return await this.userRepository.findOne(id);
    }

    async deleteUser (id: number): Promise<any> {
        const deleteUser = await this.userRepository.delete(id);
        if (deleteUser.affected) return 'Пользователь успешно удален!'
        return 'Возникла ошибка'
    }
}
