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
        if (deleteUser.affected) return new HttpException('Пользователь удален', HttpStatus.OK);
        throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }

    async updateUser(user: UpdateUserDto){
        const updateUser = await this.userRepository.update(user.id, user);
        if (updateUser.affected) return new HttpException('Данные обновлены', HttpStatus.OK);
        throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }

    async getSubscription(id: number){
        const user = await this.userRepository.findOne(id);
        if (!user) throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);

        user.isSub = true;
        await this.userRepository.update(id, user);
        return new HttpException('Абонемент добавлен', HttpStatus.OK);
    }

    async addBookToUser(data: AddBookDto){
        const user = await this.userRepository.findOne(data.userId, {relations: ["books"]});
        const book = await this.bookRepository.findOne(data.bookId, {relations: ["existence"]});

        if (!user || !book) throw new HttpException('Пользователь или книга не найдены', HttpStatus.NOT_FOUND);
        if (book.existence) throw new HttpException('Книги нет в наличие', HttpStatus.CONFLICT);
        if (!user.isSub) throw new HttpException('Для получения книги необходим абонемент', HttpStatus.CONFLICT);
        if (user.books.length == 5) throw new HttpException('Превышен лимит книг на аккаунте', HttpStatus.CONFLICT);

        book.existence = user;
        await this.bookRepository.update(book.id, book);
        return new HttpException('Книга добавлена на аккаунт', HttpStatus.OK);
    }
    
}
