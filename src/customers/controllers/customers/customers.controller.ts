import {
    Controller,
    Get,
    Post,
    Param,
    Req,
    Res,
    ParseIntPipe,
    HttpException,
    HttpStatus,
    Body,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CustomersService } from 'src/customers/services/customers/customers.service';
import { Request, Response } from 'express';
import { CustomerEditModel } from '../models/customer.Edit';
import { CustomerDtoModel } from '../models/customer.dto';

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
        @Res() res: Response
    ) {
        const customer = this.repo.findCustomer(id);
        console.log(customer);
        if (customer) {
            res.send(customer);
        } else {
            throw new HttpException('Customer is not exist', HttpStatus.BAD_REQUEST);
        }
    }

    @Post('/create')
    @UsePipes(ValidationPipe)
    createCustomer(@Body() customer: CustomerEditModel, @Res() res: Response) {
        if (customer) {
            const customerDtoData = plainToClass(CustomerDtoModel, customer);
            this.repo.createCustomer(customerDtoData);

            res.send(customerDtoData);
        } else {
            throw new HttpException('Save failed', HttpStatus.BAD_REQUEST);
        }
    }

}
