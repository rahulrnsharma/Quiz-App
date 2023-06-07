import { ApiProperty, ApiPropertyOptional, IntersectionType } from "@nestjs/swagger";
import { IsIP, IsIn, IsMobilePhone, IsNotEmpty, MaxLength, MinLength, ValidateIf } from "class-validator";
import { PlatformTypeEnum } from "src/enum/common.enum";
import { RoleEnum } from "src/enum/role.enum";

export class AuthCheckDto {
    @IsNotEmpty({ message: 'Country Code is required.' })
    @ApiProperty()
    countryCode: string;
    @ApiProperty()
    @IsMobilePhone('en-IN')
    @IsNotEmpty({ message: 'Mobile is required.' })
    mobile: string;
    @ApiProperty({ enum: [RoleEnum.USER] })
    @IsIn([RoleEnum.USER])
    @IsNotEmpty({ message: 'Role is required.' })
    role: string;
}
export class IpPlatformDto {
    @ApiPropertyOptional()
    @IsIP()
    @ValidateIf(o => o.ipAddress)
    ipAddress?: string;
    @ApiPropertyOptional({ enum: PlatformTypeEnum })
    @IsIn(Object.values(PlatformTypeEnum))
    @ValidateIf(o => o.platform)
    platform?: string;
}
export class LoginDto extends IntersectionType(AuthCheckDto, IpPlatformDto) {
    @ApiProperty()
    @IsNotEmpty({ message: 'Otp is required.' })
    otp: string;
    @ApiPropertyOptional()
    @IsNotEmpty({ message: 'Referral is required.' })
    @MinLength(11, { message: "Referral code is not valid." })
    @MaxLength(11, { message: "Referral code is not valid." })
    @ValidateIf(o => o.referral)
    referral?: string;
}
export class AdminLoginDto extends IpPlatformDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'Username is required.' })
    username: string;
    @ApiProperty()
    @IsNotEmpty({ message: 'Password is required.' })
    password: string;
}