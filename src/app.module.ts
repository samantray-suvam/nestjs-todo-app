import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './user/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(), // import loading variables from .env
    TypeOrmModule.forRootAsync(  // database connection
      {
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({  //parameters for db - postgresql
          type: 'postgres',
          host: configService.get('db_host'),
          port: +configService.get('db_port'),  // [+] --> string --> num
          username: configService.get('db_username'),
          password: configService.get('db_password'),
          database: configService.get('db_database'),
          entities: [User],
          synchronize: true // must be false for production
        }),
        inject: [ConfigService],
      }
    )
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
