import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { QuizDto } from "src/dto/quiz.dto";
import { IUser } from "src/interface/user.interface";
import { QuizParticipant, QuizParticipantDocument, QuizParticipantModel } from "src/schema/quiz-participant.schema";
import { Quiz, QuizDocument, QuizModel } from "src/schema/quiz.schema";

@Injectable()
export class QuizService {
  constructor(@InjectModel(QuizModel.name) private quizModel: Model<QuizDocument>,
    @InjectModel(QuizParticipantModel.name) private quizParticipantModel: Model<QuizParticipantDocument>) { }

  async create(quizDto: QuizDto, user: IUser) {
    const newQuize = await new this.quizModel({ ...quizDto, createdBy: user.userId }).save();
    return newQuize;
  }
  async getAll() {
    return this.quizModel.find().exec();
  }
  async getById(id: string) {
    return this.quizModel.findById(id).exec();
  }

  async update(id: any, quizDto: QuizDto, user: IUser): Promise<Quiz> {
    const _doc: Quiz = await this.quizModel.findByIdAndUpdate(id, { $set: { ...quizDto, updatedBy: user.userId } }, { runValidators: true }).exec();
    if (_doc) {
      return _doc;
    }
    else {
      throw new BadRequestException("Resource you are update does not exist.");
    }
  }
  async delete(id: any, user: IUser) {
    const _doc: Quiz = await this.quizModel.findByIdAndUpdate(id, { isActive: false, updatedBy: user.userId }, { runValidators: true }).exec();
    if (_doc) {
      return { success: true };
    }
    else {
      throw new BadRequestException("Resource you are delete does not exist.");
    }
  }
  async participant(id: string, user: IUser) {
    const _doc: QuizParticipant = await this.quizParticipantModel.findOne({ quiz: new Types.ObjectId(id), user: new Types.ObjectId(user.userId) }).exec();
    if (_doc) {
      throw new BadRequestException("Already participant.");
    }
    else {
      return new this.quizParticipantModel({ quiz: new Types.ObjectId(id), user: new Types.ObjectId(user.userId) }).save();
    }
  }
}