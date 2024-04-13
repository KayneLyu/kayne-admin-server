import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { LogMiddleware } from './log.middleware';
import { LoginGuard } from './login.guard';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [HttpModule,UserModule, TypeOrmModule.forRoot({
    type:'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'kang',
    database: 'practice',
    logging: true,
    entities: [User],
    poolSize: 10,
    connectorPackage: 'mysql2',
    synchronize: true,
    extra:{
      authPlugin: 'sha256_password',
    }
  }),
  JwtModule.registerAsync({
    async useFactory() {
      await 111;
      return {
        secret: 'kang',
        signOptions: {
          expiresIn: '7d'
        }
      }
    }
  })
],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: LoginGuard
    // }
  ],
  exports: [AppService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes('cc*')
  }
}
