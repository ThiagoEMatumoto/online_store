import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDTO } from './DTOs/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './interfaces/user.entity';

@Controller('user')
export class UserController {

  @Get()
  async getAllUsers(){
    return this.userService.getAllUser();
  }
  
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUser: CreateUserDTO): Promise<UserEntity>{
    return this.userService.createUser(createUser);
  }

}
