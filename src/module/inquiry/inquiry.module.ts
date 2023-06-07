import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { INQUIRY_SCHEMA } from 'src/schema';
import { InquiryService } from 'src/services/inquiry.service';
import { InquiryController } from './inquiry.controller';

@Module({
    imports: [MongooseModule.forFeature([INQUIRY_SCHEMA])],
    controllers: [InquiryController],
    providers: [InquiryService],
    exports: []
})
export class AppInquiryModule { }