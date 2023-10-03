import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    UserModule,
    ProductModule,
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
