import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsIn, ValidateIf } from "class-validator";
import { ActiveStatusEnum } from "src/enum/common.enum";

export class StatusDto {
    @ApiPropertyOptional({ enum: ActiveStatusEnum })
    @IsIn(Object.values(ActiveStatusEnum))
    @ValidateIf(o => o.status)
    status: string;
}