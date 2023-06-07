import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import { HasRoles } from "src/decorator/role.decorator";
import { CurrentUser } from "src/decorator/user.decorator";
import { QuizDto } from "src/dto/quiz.dto";
import { RoleEnum } from "src/enum/role.enum";
import { IUser } from "src/interface/user.interface";
import { JwtAuthGuard } from "src/services/guard/jwt-auth.guard";
import { RolesGuard } from "src/services/guard/role.guard";
import { QuizService } from "src/services/quiz.service";

@ApiTags('Quiz')
@Controller('quiz')
export class QuizController {
  constructor(private quizService: QuizService) { }


  @HasRoles(RoleEnum.ADMIN)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('')
  create(@Body() quizDto: QuizDto, @CurrentUser() user: IUser) {
    return this.quizService.create(quizDto, user);
  }

  @HasRoles(RoleEnum.ADMIN)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('')
  getAll() {
    return this.quizService.getAll();
  }

  @HasRoles(RoleEnum.ADMIN)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.quizService.getById(id);
  }

  @HasRoles(RoleEnum.USER)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id/participant')
  @ApiParam({ name: 'id' })
  participant(@Param('id') id: string, @CurrentUser() user: IUser) {
    return this.quizService.participant(id, user);
  }


  @HasRoles(RoleEnum.ADMIN)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  @ApiParam({ name: 'id' })
  update(@Body() quizDto: QuizDto, @Param('id') id: string, @CurrentUser() user: IUser) {
    return this.quizService.update(id, quizDto, user);
  }

  @HasRoles(RoleEnum.ADMIN)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiParam({ name: 'id' })
  @Delete(':id')
  delete(@Param('id') id: string, @CurrentUser() user: IUser) {
    return this.quizService.delete(id, user);
  }

}