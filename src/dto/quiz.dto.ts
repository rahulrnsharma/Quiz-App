import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsDate, IsIn, IsInt, IsMongoId, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { Types } from "mongoose";
import { GreaterThanEqualTo, LessThanEqualTo } from "src/decorator/validation/comparison.decorator";
import { QuizLevelEnum, QuizStatusEnum } from "src/enum/quiz.enum";

export class PrizeDistributeDto {
    @ApiProperty()
    @IsInt({ message: 'Rank From should be number.' })
    @IsNotEmpty({ message: 'Rank From is required.' })
    @Type(() => Number)
    rankFrom: number;
    @ApiProperty()
    @IsInt({ message: 'Rank To should be number.' })
    @IsNotEmpty({ message: 'Rank To is required.' })
    @Type(() => Number)
    rankTo: number;
    @ApiProperty()
    @IsInt({ message: 'Prize should be number.' })
    @IsNotEmpty({ message: 'Prize is required.' })
    @Type(() => Number)
    prize: number;
}

export class QuizDto {
    @ApiProperty()
    @IsString({ message: 'Title is required.' })
    @IsNotEmpty({ message: 'Title is required.' })
    title: string;
    @ApiProperty()
    @IsString({ message: 'Description is required.' })
    @IsNotEmpty({ message: 'Description is required.' })
    description: string;
    @ApiProperty({ type: 'string' })
    @IsMongoId({ message: 'Not a valid category.' })
    @Type(() => Types.ObjectId)
    category: Types.ObjectId;
    @ApiProperty()
    @IsInt({ message: 'Question should be number.' })
    @IsNotEmpty({ message: 'Question is required.' })
    @Type(() => Number)
    questions: number;
    @ApiProperty({ enum: QuizLevelEnum })
    @IsIn(Object.values(QuizLevelEnum))
    level: string
    @ApiProperty({ enum: QuizStatusEnum })
    @IsIn(Object.values(QuizStatusEnum))
    @IsNotEmpty({ message: 'Status is required.' })
    status: string;
    @ApiProperty({ type: 'string' })
    @IsDate({ message: 'Start Date is not valid.' })
    @IsNotEmpty({ message: 'Start Date is required.' })
    @Type(() => Date)
    startDate: Date;
    @ApiProperty({ type: 'string' })
    @GreaterThanEqualTo('startDate', { message: 'End date should be greater than or equal start date.' })
    @IsDate({ message: 'End date is not valid.' })
    @IsNotEmpty({ message: 'End date is required.' })
    @Type(() => Date)
    endDate: Date;
    @ApiProperty()
    @IsInt({ message: 'Entry should be number.' })
    @IsNotEmpty({ message: 'Entry is required.' })
    @Type(() => Number)
    entry: number;
    @ApiProperty()
    @IsInt({ message: 'Prize Pool should be number.' })
    @IsNotEmpty({ message: 'Prize Pool is required.' })
    @Type(() => Number)
    prizePool: number;
    @ApiProperty()
    @IsInt({ message: 'Participent should be number.' })
    @IsNotEmpty({ message: 'Participent is required.' })
    @Type(() => Number)
    participent: number;
    @ApiProperty()
    @LessThanEqualTo('participent', { message: 'Min Participent should be less than or equal to Participent.' })
    @IsInt({ message: 'Min Participent should be number.' })
    @IsNotEmpty({ message: 'Min Participent is required.' })
    @Type(() => Number)
    minParticipant: number;
    @ApiProperty({ type: [PrizeDistributeDto] })
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested()
    prize: PrizeDistributeDto[];
}