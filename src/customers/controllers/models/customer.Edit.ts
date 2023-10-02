import {
    IsNotEmpty,
    IsNumber,
    IsEmail,
    ValidateNested,
    IsNotEmptyObject
} from "class-validator";
import { AddressEditModel } from "./address.edit";
import { Type } from "class-transformer";

export class CustomerEditModel {

    @IsNotEmpty({ message: 'Id không được để trống' })
    @IsNumber({}, { message: 'Id không đúng định dạng' })
    id: number;

    @IsNotEmpty({ message: 'Tên không được để trống' })
    name: string;

    @IsEmail({}, { message: 'Không đúng định dạng email' })
    email: string;

    createAt: Date = new Date();

    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => AddressEditModel)
    address: AddressEditModel;
}