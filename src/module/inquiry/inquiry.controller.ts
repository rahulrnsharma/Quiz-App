import { Body, Controller, Get, Post, Put, Delete, Param, UseGuards, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/decorator/user.decorator';
import { InquiryDto, InquiryUpdateDto, SearchInquiryDto } from 'src/dto/inquiry.dto';
import { IUser } from 'src/interface/user.interface';
import { JwtAuthGuard } from 'src/services/guard/jwt-auth.guard';
import { InquiryService } from 'src/services/inquiry.service';

@ApiTags('Inquiry')
@Controller('inquiry')
export class InquiryController {
    constructor(private inquiryService: InquiryService) { }
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('')
    create(@Body() inquiryDto: InquiryDto, @CurrentUser() user: IUser) {
        return this.inquiryService.create(inquiryDto, user);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('')
    getAll(@Query() query: SearchInquiryDto, @CurrentUser() user: IUser) {
        return this.inquiryService.getAll(query, user);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiParam({ name: 'id' })
    getById(@Param('id') id: string) {
        return this.inquiryService.getById(id);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Put(':id/close')
    @ApiParam({ name: 'id' })
    close(@Param('id') id: string, @CurrentUser() user: IUser) {
        return this.inquiryService.close(id, user);
    }
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    @ApiParam({ name: 'id' })
    update(@Param('id') id: string, @Body() inquiryDto: InquiryUpdateDto, @CurrentUser() user: IUser) {
        return this.inquiryService.update(id, inquiryDto, user);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiParam({ name: 'id' })
    delete(@Param('id') id: string, @CurrentUser() user: IUser) {
        return this.inquiryService.delete(id, user);
    }
}