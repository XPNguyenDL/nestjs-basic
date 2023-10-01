import { Injectable } from '@nestjs/common';

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
}
