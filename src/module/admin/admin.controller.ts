import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiExcludeEndpoint, ApiTags } from "@nestjs/swagger";
import { HasRoles } from "src/decorator/role.decorator";
import { CurrentUser } from "src/decorator/user.decorator";
import { AdminDto } from "src/dto/admin.dto";
import { RoleEnum } from "src/enum/role.enum";
import { IUser } from "src/interface/user.interface";
import { AdminService } from "src/services/admin.service";
import { JwtAuthGuard } from "src/services/guard/jwt-auth.guard";
import { RolesGuard } from "src/services/guard/role.guard";

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService) { }

    @ApiExcludeEndpoint()
    @Post('')
    create(@Body() adminDto: AdminDto) {
        return this.adminService.create(adminDto);
    }

    @HasRoles(RoleEnum.ADMIN)
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('profile')
    profile(@CurrentUser() user: IUser) {
        return this.adminService.profile(user);
    }
}