import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './books.entity';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
    constructor(@InjectRepository(Book) private bookRepository: Repository<Book>) {}

    async createBook(book: CreateBookDto){
        return await this.bookRepository.save(book);
    }

    async returnBook(bookId: number){
        const book = await this.bookRepository.findOne(bookId);
        if (!book) return 'Ошибка книга не найдена';
        book.existence = null;
        return 'Успешно';
    }
}