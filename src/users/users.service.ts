import { UpdateUserDto } from './dto/update-user.dto';
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

    async getUser(id: number): Promise<User> {
        return await this.userRepository.findOne(id);
    }

    async deleteUser(id: number): Promise<string> {
        const deleteUser = await this.userRepository.delete(id);
        if (deleteUser.affected) return 'Пользователь успешно удален!'
        return 'Возникла ошибка'
    }

    async updateUser(user: UpdateUserDto): Promise<string> {
        const updateUser = await this.userRepository.update(user.id, user);
        if (updateUser.affected) return 'Данные пользователя успешно обновлены!'
        return 'Возникла ошибка'
    }

    async getSubscription(id: number): Promise<string> {
        const user = await this.getUser(id);
        if (!user) return 'Возникла ошибка'

        user.isSub = true;
        await this.userRepository.update(id, user);
        return 'Абонемент успешно получен!'
    }
}
