import {
    IsNotEmpty,
    IsNumberString,
    IsEmail
} from "class-validator";

export class CustomerEditModel {

    @IsNotEmpty({ message: 'Id không được để trống'})
    @IsNumberString({}, { message: 'Id không đúng định dạng'})
    id: number;

    @IsNotEmpty({ message: 'Tên không được để trống'})
    name: string;

    @IsEmail({}, { message: 'Không đúng định dạng email'})
    email: string;

    createAt: Date = new Date();
}