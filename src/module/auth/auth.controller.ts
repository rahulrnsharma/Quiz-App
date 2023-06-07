import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "src/decorator/user.decorator";
import { AdminLoginDto, AuthCheckDto, LoginDto } from "src/dto/auth.dto";
import { IUser } from "src/interface/user.interface";
import { AuthService } from "src/services/auth.service";
import { JwtAuthGuard } from "src/services/guard/jwt-auth.guard";
import { LocalAuthGuard } from "src/services/guard/local-auth.guard";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }


    @UseGuards(LocalAuthGuard)
    @Post('admin')
    adminLogin(@Body() adminLoginDto: AdminLoginDto, @CurrentUser() user: IUser) {
        return this.authService.adminLogin(user, adminLoginDto.ipAddress, adminLoginDto.platform)
    }
    @Post('check')
    async authCheck(@Body() authCheckDto: AuthCheckDto) {
        return this.authService.authCheck(authCheckDto);
    }
    @Post('retry')
    async authRetry(@Body() authCheckDto: AuthCheckDto) {
        return this.authService.retry(authCheckDto);
    }
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('logout')
    logout(@CurrentUser() user: IUser) {
        return this.authService.logout(user);
    }
}