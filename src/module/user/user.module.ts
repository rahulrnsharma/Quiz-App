import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from 'src/services/user.service';
import { UserController } from './user.controller';
import { USER_SCHEMA } from 'src/schema';

@Module({
    imports: [
        MongooseModule.forFeature([USER_SCHEMA])
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: []
})
export class AppUserModule { }