import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './DTOs/createUser.dto';
import { UserEntity } from './interfaces/user.entity';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userReporsitory: Repository<UserEntity>,
  ){}

  async createUser(createUserDTO:CreateUserDTO): Promise<UserEntity>{
    //criptografia da senha
    const saltOrRounds = 10;
    const passwordHash = await hash(createUserDTO.password, saltOrRounds);

    return this.userReporsitory.save({
      ...createUserDTO,
      typeUser: 1,
      password: passwordHash
    });

  }

  async getAllUser():Promise<UserEntity[]>{
    return this.userReporsitory.find();
  }


}
