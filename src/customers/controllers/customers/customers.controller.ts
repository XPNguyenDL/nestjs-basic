import { Controller, Get, Param, Req, Res, ParseIntPipe, HttpException, HttpStatus } from '@nestjs/common';
import { CustomersService } from 'src/customers/services/customers/customers.service';
import { Request, Response } from 'express';

@Controller('customers')
export class CustomersController {
    constructor(private repo: CustomersService) { }

    @Get('')
    getCustomers() {
        return this.repo.listCustomers();
    }

    @Get('/byId/:id')
    getCustomerById(
        @Param('id', ParseIntPipe) id: number, 
        @Req() req: Request, 
        @Res() res: Response) {
        const customer = this.repo.findCustomer(id);
        console.log(customer);
        if (customer) {
            res.send(customer);
        } else {
            res.status(404).send({ msg: "Customer not found" });
        }
    }


    @Get('/search/:id')
    searchCustomerById(
        @Param('id', ParseIntPipe) id: number, 
        @Req() req: Request, 
        @Res() res: Response) {
        const customer = this.repo.findCustomer(id);
        console.log(customer);
        if (customer) {
            res.send(customer);
        } else {
            throw new HttpException('Customer is not exist', HttpStatus.BAD_REQUEST);
        }
    }
}
