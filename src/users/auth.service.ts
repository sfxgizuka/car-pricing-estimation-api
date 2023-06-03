import { Injectable } from '@nestjs/common'
import { UsersService } from './users.service';

@Injectable()
export class AuthService{
    constructor(usersService: UsersService){}
}