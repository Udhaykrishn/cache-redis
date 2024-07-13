import { Controller,Get,Param,Post,Body } from '@nestjs/common';
import { BookService } from './book.service';
import {Book} from "./book.entity"

@Controller('book')
export class BookController {
    constructor(
        private readonly bookService:BookService
    ){}

    @Get("id")
    async getBook(@Param('@id') id:string):Promise<Book | null>{
        return this.bookService.getBook(Number(id))
    }

    @Post()
    async createBook(@Body() bookData:Omit<Book,"id">):Promise<Book>{
        return this.bookService.createBook(bookData)
    }
}
