import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './books.entity';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
    constructor(@InjectRepository(Book) private bookRepository: Repository<Book>) {}

    async createBook(book: CreateBookDto): Promise<Book> {
        return await this.bookRepository.save(book);
    }

    async returnBook(bookId: number): Promise<string> {
        // return await this.bookRepository.update(bookId, )
        return
    }
}