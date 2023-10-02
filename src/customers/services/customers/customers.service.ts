import { Injectable } from '@nestjs/common';
import { CustomerEditModel } from 'src/customers/controllers/models/customer.Edit';

@Injectable()
export class CustomersService {
private users = [
    {
        id: 1,
        name: "xpnguyen",
        createAt: new Date(),
    },
    {
        id: 2,
        name: "quyen",
        createAt: new Date(),
    }
]

    listCustomers() {
        return this.users;
    }

    findCustomer(id: number) {
        return this.users.find((user) => user.id === id);
    }

    createCustomer(customer: CustomerEditModel) {
        this.users.push(customer);
    }
}
