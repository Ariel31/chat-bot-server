import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create({ ...createUserDto });
      return await this.userRepository.save(user);
    } catch (ex) {
      throw new BadRequestException(ex.message);
    }
  }

  findOne(id: string) {
    return this.userRepository.findOne({
      where: { id },
      relations: ['answers'],
    });
  }
}
