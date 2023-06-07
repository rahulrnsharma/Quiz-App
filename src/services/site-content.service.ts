import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SiteContentDto } from "src/dto/sit-content.dto";
import { IUser } from "src/interface/user.interface";
import { SiteContent, SiteContentDocument, SiteContentModel } from "src/schema/site-content.schema";


@Injectable()
export class SiteContentService {
    constructor(@InjectModel(SiteContentModel.name) private siteContentModel: Model<SiteContentDocument>) { }

    async create(siteContentDto: SiteContentDto, user: IUser): Promise<SiteContent> {
        let _doc = await this.siteContentModel.findOne({ type: siteContentDto.type }).exec();
        if (_doc) {
            throw new BadRequestException("Resource of this type already exist.");
        }
        const siteContent = new this.siteContentModel({ ...siteContentDto, createdBy: user.userId });
        return siteContent.save();
    }
    async update(id: any, siteContentDto: SiteContentDto, user: IUser): Promise<SiteContent> {
        const _doc: SiteContent = await this.siteContentModel.findByIdAndUpdate(id, { $set: { ...siteContentDto, updatedBy: user.userId } }, { runValidators: true }).exec();
        if (_doc) {
            return _doc;
        }
        else {
            throw new BadRequestException("Resource you are update does not exist.");
        }
    }
    async delete(id: any, user: IUser) {
        const _doc: SiteContent = await this.siteContentModel.findByIdAndUpdate(id, { isActive: false, updatedBy: user.userId }, { runValidators: true }).exec();
        if (_doc) {
            return { success: true };
        }
        else {
            throw new BadRequestException("Resource you are delete does not exist.");
        }
    }
    async getAll(): Promise<SiteContent[]> {
        return this.siteContentModel.find({ isActive: true }).exec();
    }
    async getById(id: any): Promise<SiteContent> {
        return this.siteContentModel.findById(id).exec();
    }
    async getByType(type: String): Promise<SiteContent> {
        return this.siteContentModel.findOne({ type: type }).exec();
    }

}