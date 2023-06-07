import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, PipelineStage, Types } from "mongoose";
import { InquiryDto, InquiryUpdateDto, SearchInquiryDto } from "src/dto/inquiry.dto";
import { SortOrderEnum } from "src/enum/common.enum";
import { InquiryStatusEnum } from "src/enum/inquiry.enum";
import { RoleEnum } from "src/enum/role.enum";
import { IUser } from "src/interface/user.interface";
import { Inquiry, InquiryDocument, InquiryModel } from "src/schema/inquiry.schema";
import { PipelineService } from "./pipeline.service";

@Injectable()
export class InquiryService {
    constructor(@InjectModel(InquiryModel.name) private inquiryModel: Model<InquiryDocument>) { }

    async create(inquiryDto: InquiryDto, user: IUser): Promise<any> {
        const inquiry: any = new this.inquiryModel({ type: inquiryDto.type, title: inquiryDto.title, user: user.userId, createdBy: user.userId, thread: [{ text: inquiryDto.text, from: user.userId, role: user.role }] });
        await inquiry.save();
        return { inquiryId: inquiry._id };
    }
    async update(id: any, inquiryDto: InquiryUpdateDto, user: IUser) {
        const _doc: Inquiry = await this.inquiryModel.findByIdAndUpdate(id, {
            $push: {
                'thread': { text: inquiryDto.text, from: user.userId, role: user.role }
            },
            updatedBy: user.userId,
        },
            { new: true, runValidators: true }
        ).exec();
        if (_doc) {
            const _last = _doc.thread.pop();
            return _last;
        }
        else {
            throw new BadRequestException("Resource you are update does not exist.");
        }
    }
    async delete(id: any, user: IUser) {
        const _doc: Inquiry = await this.inquiryModel.findByIdAndUpdate(id, { isActive: false, updatedBy: user.userId }, { runValidators: true }).exec();
        if (_doc) {
            return { success: true };
        }
        else {
            throw new BadRequestException("Resource you are delete does not exist.");
        }
    }
    async close(id: any, user: IUser) {
        const _doc: Inquiry = await this.inquiryModel.findByIdAndUpdate(id, { status: InquiryStatusEnum.CLOSED, updatedBy: user.userId }, { runValidators: true }).exec();
        if (_doc) {
            return { success: true };
        }
        else {
            throw new BadRequestException("Resource you are close does not exist.");
        }
    }
    async getAll(searchDto: SearchInquiryDto, contextUser: any): Promise<any[]> {
        let _match: any = { isActive: true };
        if (contextUser.roles[0] == RoleEnum.USER) {
            _match.user = new Types.ObjectId(contextUser.userId);
        }
        if (searchDto.status) {
            _match.status = searchDto.status;
        }
        let query: PipelineStage[] = [PipelineService.match(_match), PipelineService.sort('createdAt', SortOrderEnum.DESC),];
        query.push(PipelineService.include({ type: 1, status: 1, title: 1 }, true, true))
        let _res: any[] = await this.inquiryModel.aggregate(query).exec();
        return _res;
    }
    async getById(id: any): Promise<any> {
        let _match: any = { _id: new Types.ObjectId(id) };
        let query: PipelineStage[] = [PipelineService.match(_match)];
        query.push(PipelineService.include({ type: 1, status: 1, title: 1, thread: 1 }, true, true))
        let _res: any[] = await this.inquiryModel.aggregate(query).exec();
        return _res[0];
    }
}