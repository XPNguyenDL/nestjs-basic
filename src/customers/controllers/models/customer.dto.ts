import { AddressEditModel } from "./address.edit";

export class CustomerDtoModel {
    id: number;
    name: string;
    email: string;
    createAt: Date = new Date();
    address: AddressEditModel;
}