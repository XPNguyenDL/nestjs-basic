import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../core";

export class UserDto {
    constructor(user: User) {
        this.access_token = '';
        this.address = user.address || '';
        this.birthday = user.birthday || new Date();
        this.email = user.email || '';
        this.fullname = user.fullname || '';
        this.phone = user.phone || '';
        this.avatarUrl = user.avatarUrl || '';
        this.publicUrl = user.publicUrl || '';
        this.userType = user.userType || '';
    }
    
    @ApiProperty()
    access_token: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    avatarUrl: string;

    @ApiProperty()
    publicUrl: string;

    @ApiProperty()
    fullname: string;

    @ApiProperty()
    birthday: Date;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    address: string;

    @ApiProperty()
    userType: string;
}