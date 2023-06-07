import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { AdminLoginDto, AuthCheckDto, LoginDto } from "src/dto/auth.dto";
import { IUser } from "src/interface/user.interface";
import { LoginDocument, LoginModel } from "src/schema/login.schema";
import { AppConfigService } from "./config.service";
import { AdminService } from "./admin.service";
import { UserService } from "./user.service";

@Injectable()
export class AuthService {
    constructor(@InjectModel(LoginModel.name) private loginModel: Model<LoginDocument>,
        private userService: UserService, private adminService: AdminService,
        private jwtService: JwtService, private appConfigService: AppConfigService) { }

    async validateAdminUser(loginDto: AdminLoginDto): Promise<any> {
        const user: any = await this.adminService.findByUserNameAndPassword(loginDto);
        if (user) {
            const result: IUser = {
                userId: user._id,
                role: user.role
            };
            return result;
        }
        return null;
    }
    async adminLogin(user: IUser, ipAddress: any, platform: any) {
        const login = await this.loginDetail(user.userId, user.role, ipAddress, platform);
        user.loggedInId = login._id;
        return { token: this.jwtService.sign(user, { expiresIn: this.appConfigService.adminExpireIn }) };
    }
    async authCheck(authCheckDto: AuthCheckDto) {
        const response = await this.userService.findOne(authCheckDto);
        if (!response) {
            this.userService.create(authCheckDto);
            return { isNew: true }
        } else {
            return { isNew: false }
        }
    }
    async retry(authCheckDto: AuthCheckDto) {
        return { success: true };
    }
    async login(loginDto: LoginDto) {
        let user: any = await this.userService.findOne({ countryCode: loginDto.countryCode, mobile: loginDto.mobile, role: loginDto.role });
        if (!user.isActive) {
            throw new BadRequestException("This user has not been active.");
        }
        if (loginDto.otp != '1234') {
            throw new BadRequestException("Otp not valid.");
        }
        if (loginDto.referral) {
            await this.userService.checkReferral(loginDto.referral, user._id);
        }
        const login = await this.loginDetail(user._id, user.role, loginDto.ipAddress, loginDto.platform);
        return {
            token: this.jwtService.sign({ loggedInId: login._id, userId: user._id, role: user.role }, { expiresIn: this.appConfigService.userExpireIn })
        };
    }
    async logout(user: IUser) {
        this.loginModel.findByIdAndUpdate(user.loggedInId, { isLoggedIn: false }).exec();
        return { success: true }
    }
    async loginDetail(userId: any, role: String, ipAddress: string, platform: string) {
        return new this.loginModel({ user: userId, role: role, ip: ipAddress, platform: platform, isLoggedIn: true }).save();
    }
    async getLoggedInDetail(id: any) {
        return this.loginModel.findOne({ user: new Types.ObjectId(id), isLoggedIn: true }, {}, { sort: { createdAt: -1 } });
    }
}