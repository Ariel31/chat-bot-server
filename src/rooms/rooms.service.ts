import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { Room } from './entities/room.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    private userService: UsersService,
  ) {}

  async create(createRoomDto: CreateRoomDto) {
    try {
      const room = this.roomRepository.create({ ...createRoomDto });
      return await this.roomRepository.save(room);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  findAll() {
    return this.roomRepository.find();
  }

  async findOne(id: string) {
    try {
      return await this.roomRepository.findOne({
        where: { id },
        relations: ['messages', 'users', 'messages.from'],
        order: {
          messages: {
            created_at: 'ASC',
          },
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
