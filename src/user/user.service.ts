import { Injectable } from '@nestjs/common';
import { EntityManager,Repository} from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectEntityManager,InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';


@Injectable()
export class UserService {

  // constructor(private readonly manage:EntityManager){
  // }
  // constructor(private readonly userManage:Repository<User>){
  // }

  // @InjectEntityManager()
  // private manage: EntityManager
  /**
   * name
   */

  @InjectRepository(User)
  private userManage:Repository<User>
  

  create(createUserDto: CreateUserDto) {
    this.userManage.save(createUserDto)
  }

  findAll() {
    return this.userManage.find();
  }

  findOne(id: number) {
    return this.userManage.findOne({
      where:{id}
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userManage.save({
      id,
      ...updateUserDto
    })
  }

  remove(id: number) {
    return this.userManage.delete(id)
  }
}
