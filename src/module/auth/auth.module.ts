import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from 'src/services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from 'src/services/strategy/local.strategy';
import { JwtStrategy } from 'src/services/strategy/jwt.strategy';
import { ADMIN_SCHEMA, LOGIN_SCHEMA, USER_SCHEMA } from 'src/schema';
import { AppConfigService } from 'src/services/config.service';
import { AdminService } from 'src/services/admin.service';
import { UserService } from 'src/services/user.service';

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET')
            }),
            inject: [ConfigService]
        }),
        MongooseModule.forFeature([USER_SCHEMA, LOGIN_SCHEMA, ADMIN_SCHEMA])
    ],
    controllers: [AuthController],
    providers: [AuthService, AdminService, UserService, LocalStrategy, JwtStrategy, AppConfigService],
    exports: []
})
export class AppAuthModule { }