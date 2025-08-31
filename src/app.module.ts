import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './user/entities/user.entity';
// import { UserController } from './user/user.controller';

@Module({
  imports: [
    ConfigModule.forRoot({   // import loading variables from .env
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({  // database connection
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          //parameters for db - postgresql
          type: 'postgres',
          host: configService.get('db_host'),
          port: +configService.get('db_port'), // [+] --> string --> num
          username: configService.get('db_username'),
          password: configService.get('db_password'),
          database: configService.get('db_database'),
          entities: [User],
          synchronize: true, // must be false for production
          autoLoadEntities: true,
        }),
        inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
