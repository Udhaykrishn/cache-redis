import { Injectable,Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { PrismaService } from 'src/prisma/prisma.service';
import { Book } from '@prisma/client';

@Injectable()
export class BookService {
    constructor(
        private readonly prsima:PrismaService,
        @Inject(CACHE_MANAGER) private cacheManager:Cache,
    ){}

    async getBook(id:number):Promise<Book | null>{   
        const cacheKey = `book:${id}`;
        const cacheBook = await this.cacheManager.get<Book>(cacheKey)

        if(cacheBook){
            return cacheBook;
        }

        const book = await this.prsima.book.findUnique({where:{id}})

        if(book){
            await this.cacheManager.set(cacheKey,book)
        }
        return book;

    }

    async createBook(bookData:Omit<Book,"id">):Promise<Book>{
       const book = await this.prsima.book.create({data:bookData})
        await this.cacheManager.set(`book:${book.id}`,book)
        return book;
    }
}
