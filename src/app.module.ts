import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { CacheModule } from './cache/cache.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UserModule, BookModule, CacheModule, PrismaModule],
  
})
export class AppModule {}
