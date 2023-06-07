import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class DeviceInfoDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'Device id is required.' })
    id: string;
    @ApiProperty()
    @IsNotEmpty({ message: 'Device name is required.' })
    name: string;
    @ApiProperty()
    @IsNotEmpty({ message: 'Device token is required.' })
    token: string;
}