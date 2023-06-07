import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, PipelineStage, Types } from "mongoose";
import { AuthCheckDto } from "src/dto/auth.dto";
import { UserDocument, UserModel } from "src/schema/user.schema";
import { UtilityService } from "./utility.service";
import { DeviceInfoDto } from "src/dto/user.dto";
import { IUser } from "src/interface/user.interface";
import { PipelineService } from "./pipeline.service";

@Injectable()
export class UserService {
    constructor(@InjectModel(UserModel.name) private userModel: Model<UserDocument>) { }

    async create(authCheckDto: AuthCheckDto): Promise<UserDocument> {
        let _referralCode: String = '';
        while (true) {
            _referralCode = UtilityService.referralCode();
            let _referral = await this.userModel.findOne({ referral: _referralCode });
            if (!_referral) {
                break;
            }
        }
        return new this.userModel({ ...authCheckDto, referral: _referralCode }).save();
    }
    async findOne(authCheckDto: AuthCheckDto): Promise<UserDocument> {
        return this.userModel.findOne(authCheckDto);
    }
    async checkReferral(referral: string, userId: any) {
        let referredBy: UserDocument = await this.userModel.findOne({ referral: referral });
        if (referredBy) {
            // const _config: any = await this.siteConfigService.getAll();
            // let profile: any;
            // start: while (true) {
            //     const referralCode = this.utilityService.getReferral();
            //     let _referral = await this.userProfileModel.findOne({ referral: referralCode });
            //     if (!_referral) {
            //         profile = new this.userProfileModel({ referral: referralCode, referredBy: referral, wallet: _config.refereeAmount, user: userId, createdBy: userId });
            //         break;
            //     }
            //     else {
            //         continue start
            //     }
            // }
            // referredBy.wallet = referredBy.wallet + _config.referredAmount;
            // new this.transactionModel({
            //     user: referredBy.user,
            //     amount: _config.referredAmount,
            //     category: TransectionCategoryTypeEnum.WALLET,
            //     type: TransectionTypeEnum.CREDIT,
            //     transectionId: userId,
            //     for: TransectionForTypeEnum.FORREFERRAL,
            //     status: TransectionStatusEnum.SUCCESS
            // }).save();
            // new this.transactionModel({
            //     user: userId,
            //     amount: _config.refereeAmount,
            //     category: TransectionCategoryTypeEnum.WALLET,
            //     type: TransectionTypeEnum.CREDIT,
            //     transectionId: referredBy.user,
            //     for: TransectionForTypeEnum.BEREFERRAL,
            //     status: TransectionStatusEnum.SUCCESS
            // }).save();
            // await profile.save();
            // await referredBy.save();
        }
        else {
            throw new BadRequestException("Referral code does not exist.");
        }
    }
    async updateDevice(deviceInfoDto: DeviceInfoDto, user: IUser) {
        this.userModel.findByIdAndUpdate(user.userId, { $set: { device: deviceInfoDto } }, { new: true, runValidators: true });
        return { success: true };
    }
    async profile(user: IUser) {
        let query: PipelineStage[] = [PipelineService.match({ _id: new Types.ObjectId(user.userId) })];
        query.push(PipelineService.exclude({ device: 0, role: 0 }, false, false));
        const _data: any[] = await this.userModel.aggregate(query).exec();
        return _data[0];
    }
}