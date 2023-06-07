import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { HasRoles } from "src/decorator/role.decorator";
import { CurrentUser } from "src/decorator/user.decorator";
import { DeviceInfoDto } from "src/dto/user.dto";
import { RoleEnum } from "src/enum/role.enum";
import { IUser } from "src/interface/user.interface";
import { JwtAuthGuard } from "src/services/guard/jwt-auth.guard";
import { RolesGuard } from "src/services/guard/role.guard";
import { UserService } from "src/services/user.service";

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }
    @HasRoles(RoleEnum.USER)
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('device')
    async device(@Body() deviceInfoDto: DeviceInfoDto, @CurrentUser() user: IUser) {
        return this.userService.updateDevice(deviceInfoDto, user);
    }

    @HasRoles(RoleEnum.USER)
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('profile')
    profile(@CurrentUser() user: IUser) {
        return this.userService.profile(user);
    }
}