import { Controller,Get,Param,Post,Body } from '@nestjs/common';
import { UserService } from './user.service';
import {User} from "./user.entity"

@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){}

    @Get(":id")
    async getUser(@Param('id')id:string):Promise<User | null>{
       return this.userService.getUser(Number(id)) 
    }

    @Post()
    async createUser(@Body() userData:Omit<User,'id'>):Promise<User>{
        return this.userService.createUser(userData)
    }
}
