import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Res,
  HttpStatus,
  Req
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../models/dto/create-user.dto';
import { UpdateUserDto } from '../models/dto/update-user.dto';
import { User } from 'src/core/entities';
import { Request, Response, response } from 'express';
import ApiResponse from 'src/models/apiResponse';

@Controller('/api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      this.usersService.create(createUserDto).then(response => {
        if (response) {
          res.status(200).json(ApiResponse.Success(response));
        } else {
          res.status(200).json(ApiResponse.Fail(HttpStatus.NOT_FOUND, "User is not found"));
        }
      });
    } catch (error) {
      res.status(200).json(ApiResponse.Fail(HttpStatus.BAD_REQUEST, error.message));
    }
  }

  @Get()
  findAll(@Res() res: Response) {
    this.usersService.findAll().then(response => {
      res.status(HttpStatus.OK).json(ApiResponse.Success(response))
    })

  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      this.usersService.findOne(id).then(response => {
        if (response) { 
          res.status(200).json(ApiResponse.Success(response));
        } else {
          res.status(200).json(ApiResponse.Fail(HttpStatus.NOT_FOUND, "User is not found"));
        }
      });
    } catch (error) {
      res.status(200).json(ApiResponse.Fail(HttpStatus.BAD_REQUEST, error.message));
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
