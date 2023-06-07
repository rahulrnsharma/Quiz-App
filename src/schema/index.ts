
import { AdminModel } from "./admin.schema";
import { CategoryModel } from "./category.schema";
import { InquiryModel } from "./inquiry.schema";
import { LoginModel } from "./login.schema";
import { QuestionModel } from "./question.schema";
import { QuizParticipantModel } from "./quiz-participant.schema";
import { QuizModel } from "./quiz.schema";
import { SiteContentModel } from "./site-content.schema";
import { UserModel } from "./user.schema";

export const ADMIN_SCHEMA = { name: AdminModel.name, schema: AdminModel.schema };
export const CATEGORY_SCHEMA = { name: CategoryModel.name, schema: CategoryModel.schema };
export const INQUIRY_SCHEMA = { name: InquiryModel.name, schema: InquiryModel.schema };
export const LOGIN_SCHEMA = { name: LoginModel.name, schema: LoginModel.schema };
export const QUIZ_PARTICIPANT_SCHEMA = { name: QuizParticipantModel.name, schema: QuizParticipantModel.schema };
export const QUIZ_SCHEMA = { name: QuizModel.name, schema: QuizModel.schema };
export const SITE_CONTENT_SCHEMA = { name: SiteContentModel.name, schema: SiteContentModel.schema };
export const USER_SCHEMA = { name: UserModel.name, schema: UserModel.schema };
export const QUESTION_SCHEMA = { name: QuestionModel.name, schema: QuestionModel.schema }

export const ALL_SCHEMA = [
    ADMIN_SCHEMA,
    CATEGORY_SCHEMA,
    INQUIRY_SCHEMA,
    LOGIN_SCHEMA,
    QUIZ_PARTICIPANT_SCHEMA,
    QUIZ_SCHEMA,
    SITE_CONTENT_SCHEMA,
    USER_SCHEMA,
    QUESTION_SCHEMA
]