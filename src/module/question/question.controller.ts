import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import { HasRoles } from "src/decorator/role.decorator";
import { CurrentUser } from "src/decorator/user.decorator";
import { QuestionDto } from "src/dto/question.dto";
import { RoleEnum } from "src/enum/role.enum";
import { IUser } from "src/interface/user.interface";
import { JwtAuthGuard } from "src/services/guard/jwt-auth.guard";
import { RolesGuard } from "src/services/guard/role.guard";
import { QuestionService } from "src/services/question.service";


@ApiTags('question')
@Controller('question')
export class QuestionController {
    constructor(private questionService: QuestionService) { }

    @HasRoles(RoleEnum.ADMIN)
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('')
    create(@Body() questionDto: QuestionDto, @CurrentUser() user: IUser) {
        return this.questionService.create(questionDto, user);
    }
    @HasRoles(RoleEnum.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @Get('')
    getAll() {
        return this.questionService.getAll();
    }
    @HasRoles(RoleEnum.ADMIN)
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id')
    @ApiParam({ name: "id" })
    getById(@Param('id') id: String) {
        return this.questionService.getById(id);
    }
    @HasRoles(RoleEnum.ADMIN)
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id')
    @ApiParam({ name: "id" })
    update(@Param('id') id: String, @Body() questionDto: QuestionDto, @CurrentUser() user: IUser) {
        return this.questionService.update(id, questionDto, user);
    }

    @HasRoles(RoleEnum.ADMIN)
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    @ApiParam({ name: "id" })
    delete(@Param('id') id: String, @CurrentUser() user: IUser) {
        return this.questionService.delete(id, user);
    }
}





