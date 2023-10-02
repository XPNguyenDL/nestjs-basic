import { Injectable } from '@nestjs/common';
import { CustomerEditModel } from 'src/customers/controllers/models/customer.Edit';
import { CustomerDtoModel } from 'src/customers/controllers/models/customer.dto';

@Injectable()
export class CustomersService {
private users: Array<CustomerDtoModel> = [
    {
        id: 1,
        name: "xpnguyen",
        email: "xpnguyen@gmail.com",
        createAt: new Date(),
    },
    {
        id: 2,
        name: "quyen",
        email: "2115260@dlu.edu.vn",
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
