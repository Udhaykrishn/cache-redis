import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import {  PrismaClient } from '@prisma/client';
import { Logger } from '@nestjs/common';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy,OnModuleInit {
    private readonly logger = new Logger(PrismaService.name) 

    async onModuleDestroy(){
        this.logger.log("Database Successfully Disconnected")
        await this.$disconnect()
    }
    async onModuleInit(){
        this.logger.log("Database Successfully Connected")
        await this.$connect()
    }
}
