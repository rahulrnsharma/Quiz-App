import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsIn, IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";
import { QuestionTypeEnum } from "src/enum/question.enum";


export class QuestionDto {
    @ApiProperty({ type: 'string' })
    @IsMongoId({ message: 'Not a valid category.' })
    @Type(() => Types.ObjectId)
    category: Types.ObjectId;
    @ApiProperty()
    @IsNotEmpty({ message: 'Question must be required' })
    @IsString({ message: 'Question Should be String' })
    question: string;
    @ApiProperty({ enum: QuestionTypeEnum })
    @IsIn(Object.values(QuestionTypeEnum))
    @IsNotEmpty({ message: 'Type is required.' })
    type: string;
    @ApiProperty({ type: [String] })
    @IsArray()
    @ArrayMinSize(2)
    @ArrayMaxSize(4)
    option: string[];
    @ApiProperty()
    @IsString({ message: 'Correct answer Should be String' })
    @IsNotEmpty({ message: "Please enter the correct answer" })
    correct: String;
}