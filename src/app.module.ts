import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
    // SequelizeModule.forRoot({
    //   dialect: 'postgres',
    //   host: 'localhost',
    //   port: 1433,
    //   username: 'postgres',
    //   password: 'postgres',
    //   database: 'postgres',
    //   autoLoadModels: true,
    //   synchronize: true,
    // }),
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadModels: true,
      synchronize: true,
    }),
    CategoryModule,
    ProductModule,
    UserModule,
    RoleModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
