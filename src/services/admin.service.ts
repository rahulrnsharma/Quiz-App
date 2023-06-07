import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AdminDto } from "src/dto/admin.dto";
import { Admin, AdminDocument, AdminModel } from "src/schema/admin.schema";
import { PasswordService } from "./password.service";
import { AdminLoginDto } from "src/dto/auth.dto";
import { IUser } from "src/interface/user.interface";

@Injectable()
export class AdminService {
    constructor(@InjectModel(AdminModel.name) private adminModel: Model<AdminDocument>) { }

    async create(admin: AdminDto) {
        admin.password = await PasswordService.hash(admin.password);
        return new this.adminModel({ ...admin }).save();
    }
    async findByUserNameAndPassword(loginDto: AdminLoginDto) {
        const admin: Admin = await this.adminModel.findOne({ username: loginDto.username });
        if (admin) {
            const isMatch = await PasswordService.compare(loginDto.password, admin.password);
            if (!isMatch) {
                throw new BadRequestException("Invalid Credentials.");
            }
            return admin;
        }
        throw new BadRequestException("Invalid Credentials.");
    }
    async profile(user: IUser) {
        return this.adminModel.findById(user.userId, { firstName: 1, lastName: 1, image: 1 }).exec();
    }
}