import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from './Config/typeorm.service';
import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';
import { ChatsModule } from './messages/messages.module';
import { SocketModule } from './socket/socket.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    UsersModule,
    RoomsModule,
    ChatsModule,
    SocketModule,
    SearchModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
