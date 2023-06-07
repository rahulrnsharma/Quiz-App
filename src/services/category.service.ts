import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CategoryDto, SearchCategoryDto } from "src/dto/category.dto";
import { ActiveStatusEnum } from "src/enum/common.enum";
import { IUser } from "src/interface/user.interface";
import { Category, CategoryDocument, CategoryModel } from "src/schema/category.schema";


@Injectable()
export class CategoryService {
    constructor(@InjectModel(CategoryModel.name) private categoryModel: Model<CategoryDocument>) { }

    async create(categoryDto: CategoryDto, user: IUser): Promise<Category> {
        return new this.categoryModel({ ...categoryDto, createdBy: user.userId }).save();
    }
    async update(id: any, categoryDto: CategoryDto, user: IUser): Promise<Category> {
        const _doc: Category = await this.categoryModel.findByIdAndUpdate(id, { $set: { ...categoryDto, updatedBy: user.userId } }, { runValidators: true }).exec();
        if (_doc) {
            return _doc;
        }
        else {
            throw new BadRequestException("Resource you are update does not exist.");
        }
    }
    async delete(id: any, user: IUser) {
        const _doc: Category = await this.categoryModel.findByIdAndUpdate(id, { isActive: false, updatedBy: user.userId }, { runValidators: true }).exec();
        if (_doc) {
            return { success: true };
        }
        else {
            throw new BadRequestException("Resource you are delete does not exist.");
        }
    }
    async getAll(searchDto: SearchCategoryDto): Promise<Category[]> {
        let _filter: any = {};
        if (searchDto.status) {
            _filter["isActive"] = searchDto.status == ActiveStatusEnum.ACTIVE
        }
        return this.categoryModel.find(_filter).exec();
    }
    async getById(id: any): Promise<Category> {
        return this.categoryModel.findById(id).exec();
    }
    async dropdown(): Promise<Category[]> {
        return this.categoryModel.find({ isActive: true }, { name: 1, code: 1 }).exec();
    }

}