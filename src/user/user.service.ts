import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './DTOs/createUser.dto';
import { User } from './interfaces/user.interface';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  private users: User[] = []
  async createUser(createUserDTO:CreateUserDTO): Promise<User>{
    //criptografia da senha
    const saltOrRounds = 10;
    const passwordHash = await hash(createUserDTO.password, saltOrRounds);
    const user ={
      ...createUserDTO,
      id: this.users.length + 1,
      password: passwordHash
    }

    this.users.push(user)

    return user
  }

  async getAllUser():Promise<User[]>{
    return this.users;
  }


}
