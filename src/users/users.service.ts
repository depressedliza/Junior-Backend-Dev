import { AddBookDto } from './dto/add-book.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from 'src/books/books.entity';

@Injectable()
export class UsersService {
    
    constructor(@InjectRepository(User) private userRepository: Repository<User>, @InjectRepository(Book) private bookRepository: Repository<Book>) {

    }

    async createUser(user: CreateUserDto){
        return await this.userRepository.save(user);
    }

    async getAllUsers(){
        return await this.userRepository.find();
    }

    async getUser(id: number){
        const user = await this.userRepository.find({
            relations: ["books"],
                where: {id}, take: 1});
        if (Object.keys(user).length == 0) throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
        return user;
    }

    async deleteUser(id: number){
        const deleteUser = await this.userRepository.delete(id);
        if (deleteUser.affected) return 'Пользователь успешно удален!'
        return 'Возникла ошибка'
    }

    async updateUser(user: UpdateUserDto){
        const updateUser = await this.userRepository.update(user.id, user);
        if (updateUser.affected) return 'Данные пользователя успешно обновлены!'
        return 'Возникла ошибка'
    }

    async getSubscription(id: number){
        const user = await this.userRepository.findOne(id);
        if (!user) return 'Данный пользователь не найден!'

        user.isSub = true;
        await this.userRepository.update(id, user);
        return 'Абонемент успешно получен!'
    }

    async addBookToUser(data: AddBookDto){
        const user = await this.userRepository.findOne(data.userId);
        const book = await this.bookRepository.findOne(data.bookId);
        if(!user || !book) return 'Ошибку';
        if (book.existence) return 'Книга уже используется!';
        if (!user.isSub) return 'Для получение книги необходимо иметь абонемент!'

        book.existence = user;
        await this.bookRepository.update(book.id, book);
        return 'Успешно!'
    }
    
}
