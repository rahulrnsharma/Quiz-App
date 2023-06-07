import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ADMIN_SCHEMA } from 'src/schema';
import { AdminController } from './admin.controller';
import { AdminService } from 'src/services/admin.service';

@Module({
    imports: [
        MongooseModule.forFeature([ADMIN_SCHEMA])
    ],
    controllers: [AdminController],
    providers: [AdminService],
    exports: []
})
export class AppAdminModule { }