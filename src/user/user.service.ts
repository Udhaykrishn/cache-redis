import { Injectable,Inject } from '@nestjs/common';
import { UserModule } from "./user.module";
import { PrismaService } from "./../prisma/prisma.service";
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { User } from './user.entity';
import { privateDecrypt } from 'crypto';
import { PrismaModule } from '../prisma/prisma.module';

@Injectable()
export class UserService {
    constructor(
        private prisma:PrismaService,
        @Inject(CACHE_MANAGER) private readonly cacheManager:Cache,
    ){}

    async getUser(id:number):Promise<User | null>{
        const cachekey = `user:${id}`
        const cacheUser = await this.cacheManager.get<User>(cachekey)
        if(cacheUser){
            return cacheUser
        }

        const user = await this.prisma.user.findUnique({where:{id}})
        if(user){
            await this.cacheManager.set(cachekey,user)
        }

        return user;
    }

    async createUser(userData:Omit<User,'id'>):Promise<User>{
        const user = await this.prisma.user.create({data:userData})
        await this.cacheManager.set(`user:${user.id}`,user)
        return user;
    }

}
