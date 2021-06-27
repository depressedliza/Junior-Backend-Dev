import { AddBookDto } from './dto/add-book.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from 'src/books/books.entity';

@Injectable()
export class UsersService {
    
    constructor(@InjectRepository(User) private userRepository: Repository<User>, @InjectRepository(Book) private bookRepository: Repository<Book>) {

    }

    async createUser(user: CreateUserDto): Promise<User> {
        return await this.userRepository.save(user);
    }

    async getAllUsers(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async getUser(id: number): Promise<any> {
        // const user = await this.userRepository.findOne(id);
        // const booksUser = await this.getUserBooks(id);
        // return Object.assign(user, booksUser);
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
        if (!user) return 'Данный пользователь не найден!'

        user.isSub = true;
        await this.userRepository.update(id, user);
        return 'Абонемент успешно получен!'
    }

    async addBookToUser(data: AddBookDto): Promise<string> {
        const userBooks = await this.bookRepository.find({where: {existence: data.userId}});
        if (userBooks.length == 5) return 'Пользователь не может иметь больше 5-ти книг одновременно!'
        if (!data.bookId) return 'Данная книга не найдена!'

        const book = await this.bookRepository.findOne(data.bookId)
        if (book.existence == 0) {
            book.existence = data.userId
            await this.bookRepository.update(book.id, book)
            return 'Успешно!'
        }
        return "Данная книга уже используется"
    }
}
