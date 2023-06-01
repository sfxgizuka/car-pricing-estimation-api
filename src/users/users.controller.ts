import { Body, Controller, Delete, Get, Param, Post, Query, Patch, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UsersService} from './users.service'
import { Serialize } from '../interceptors/serialize.interceptor'
import { UserDto } from './dto/user.dto'

@Controller('auth')
export class UsersController {
    constructor(private usersService:UsersService){}

    @Post('signup')
    createUser(@Body() body: CreateUserDto){
        this.usersService.create(body.email, body.password)
    }

    @Get(':id')
    @Serialize(UserDto)
    findUser(@Param('id')id : string){
        console.log('controller')
        return this.usersService.findOne(parseInt(id))
    }

    @Get()
    findAllUsers(@Query('email')email: string){
        return this.usersService.find(email)
    }

    @Delete(':id')
    removeUserById(@Param('id')id: string){
        return this.usersService.remove(parseInt(id))
    }

    @Patch(':id')
    updateUserById(@Param('id')id: string, @Body()body: UpdateUserDto){
        return this.usersService.update(parseInt(id), body)
    }

}
