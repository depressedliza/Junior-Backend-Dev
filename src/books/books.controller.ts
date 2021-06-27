import { BooksService } from './books.service';
import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './books.entity';

@ApiTags('Работа с книгами')
@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService) {}

    @ApiOperation({summary: 'Добавление книги'})
    @ApiResponse({status: 200, type: Book})
    @Post()
    async create(@Body() bookDto: CreateBookDto){
        return this.booksService.createBook(bookDto)
    }
    
    @Put(':id/return')
    async returnBook(@Param('id') id: number){
        return this.booksService.returnBook(id);
    }
}
