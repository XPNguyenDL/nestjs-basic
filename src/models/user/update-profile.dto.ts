import { ApiProperty } from "@nestjs/swagger";

export class UserProfileDto {
    @ApiProperty()
    fullname: string;

    @ApiProperty()
    birthday: Date;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    address: string;
}