import { Body, Controller, Delete, Get, Param, Post, Query, Patch,  Session, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UsersService} from './users.service'
import { Serialize } from '../interceptors/serialize.interceptor'
import { UserDto } from './dto/user.dto'
import { AuthService } from './auth.service'
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
    constructor(
        private usersService:UsersService,
        private authService: AuthService
        ){}

    @Post('signup')
    async createUser(@Body() body: CreateUserDto, @Session() session: any){
        const user = await this.authService.signup(body.email, body.password)
        session.userId = user.id
        return user
    }

    @Post('signout')
    signOut(@Session() session: any){
        session.userId = null
    }

    @Post('signin')
    async signin(@Body() body: CreateUserDto, @Session() session: any){
        const user = await this.authService.signin(body.email, body.password)
        session.userId = user.id
        return user
    }

    @Get('whoami')
    @UseGuards(AuthGuard)
    whoAmI(@CurrentUser() user: User){
        return user
    }

    @Get(':id')
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
