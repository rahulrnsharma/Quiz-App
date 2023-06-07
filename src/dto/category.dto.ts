import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { StatusDto } from "./common.dto";

export class CategoryDto {
    @ApiProperty()
    @IsString({ message: 'Name should be string.' })
    @IsNotEmpty({ message: 'Name is required.' })
    name: string;
    @ApiProperty()
    @IsString({ message: 'Code should be string.' })
    @IsNotEmpty({ message: 'Code is required.' })
    code: string;
}

export class SearchCategoryDto extends StatusDto {
}