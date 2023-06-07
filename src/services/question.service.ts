import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { QuestionDto } from "src/dto/question.dto";
import { IUser } from "src/interface/user.interface";
import { Question, QuestionDocument, QuestionModel } from "src/schema/question.schema";

@Injectable()
export class QuestionService {
  constructor(@InjectModel(QuestionModel.name) private questionModel: Model<QuestionDocument>) { }
  async create(questionDto: QuestionDto, user: IUser) {
    return new this.questionModel({ ...questionDto, createdBy: user.userId }).save()
  }

  async update(id: String, questionDto: QuestionDto, user: IUser) {
    const _doc: Question = await this.questionModel.findByIdAndUpdate(id, { $set: { ...questionDto, updatedBy: user.userId } }, { runValidators: true }).exec();
    if (_doc) {
      return _doc;
    }
    else {
      throw new BadRequestException("Resource you are update does not exist.");
    }
  }

  async delete(id: any, user: IUser) {
    const _doc: Question = await this.questionModel.findByIdAndUpdate(id, { isActive: false, updatedBy: user.userId }, { runValidators: true }).exec();
    if (_doc) {
      return { success: true };
    }
    else {
      throw new BadRequestException("Resource you are delete does not exist.");
    }
  }
  async getAll() {
    return this.questionModel.find();
  }

  async getById(id: String) {
    return this.questionModel.findById(id);
  }
}

