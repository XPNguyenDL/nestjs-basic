import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

// Import controllers
import {
  HomepageController,
  UsersController
} from './controllers';

// Import services
import {
  UsersService
} from './services';

// Import entities
import {
  User,
  UserSchema
} from './core/entities';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{
      name: User.name,
      schema: UserSchema
    }]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [
    UsersController,
    HomepageController
  ],
  providers: [
    UsersService
  ],
})
export class AppModule { }
