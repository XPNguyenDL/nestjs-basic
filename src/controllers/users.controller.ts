import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
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
    Req,
    UseGuards,
    UseInterceptors,
    Query
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { AuthGuard } from '../auth';
import { ApiResponse, UserFilter } from '../models';
import { UsersService } from '../services/users.service';
import { CreateUserDto, UserProfileDto } from '../models';
import { LoginDto } from '../models';
import { CloudinaryService } from '../media/cloud-file-media-manager';
import { PaginationResult } from '../core/collections';

@Controller('/api/users')
@ApiTags('User endpoints')
export class UsersController {
    constructor(private readonly usersService: UsersService,
        private readonly cloudinaryService: CloudinaryService) { }

    @Get()
    findAll(@Res() res: Response, @Req() req: Request, @Query() model: UserFilter) {
        try {
            const condition = new UserFilter();
            Object.assign(condition, model);

            this.usersService.findAll(condition.keyword, condition).then(response => {
                const paginationResult = new PaginationResult(response);

                res.status(HttpStatus.OK).json(ApiResponse.success(paginationResult))
            })
                .catch(error => {
                    res.status(200).json(ApiResponse.fail(HttpStatus.BAD_REQUEST, error.message));
                });
        } catch (error) {
            return res.status(200).json(ApiResponse.fail(HttpStatus.BAD_REQUEST, error.message));
        }
    }

    @Get('byid/:id')
    findOne(@Param('id') id: string, @Res() res: Response) {
        this.usersService.findOne(id).then(response => {
            if (response) {
                res.status(200).json(ApiResponse.success(response));
            } else {
                res.status(200).json(ApiResponse.fail(HttpStatus.NOT_FOUND, "User is not found"));
            }
        })
            .catch(error => {
                res.status(200).json(ApiResponse.fail(HttpStatus.BAD_REQUEST, error.message));
            });
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    async getProfile(@Req() req, @Res() res: Response) {
        const userData = req.user;
        await this.usersService.findOne(userData.sub).then((response) => {
            if (response) {
                res.status(200).json(ApiResponse.success(response));
            } else {
                res.status(200).json(ApiResponse.fail(HttpStatus.NOT_FOUND, "User is not found"));
            }
        })
    }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
        res.header('Access-Control-Allow-Origin', '*')
        await this.usersService.create(createUserDto).then((response) => {
            if (response) {
                res.status(200).json(ApiResponse.success(response));
            } else {
                res.status(200).json(ApiResponse.fail(HttpStatus.NOT_FOUND, "User is not found"));
            }
        })
        .catch((error) => {
            res.status(200).json(ApiResponse.fail(HttpStatus.BAD_REQUEST, error.message));
        });
    }
    
    @Post('login')
    async login(@Body() loginDto: LoginDto, @Res() res: Response) {
        res.header('Access-Control-Allow-Origin', '*')
        const { email, password } = loginDto;

        await this.usersService.login(email, password).then(response => {
            if (response) {
                res.status(200).json(ApiResponse.success(response));
            } else {
                res.status(200).json(ApiResponse.fail(HttpStatus.NOT_FOUND, "User is not found"));
            }
        })
            .catch(error => {
                res.status(200).json(ApiResponse.fail(HttpStatus.BAD_REQUEST, error.message));
            });
    }

    @UseGuards(AuthGuard)
    @Post('setAvatar')
    @UseInterceptors(FileInterceptor('file'))
    async setAvatar(@Req() req, @Res() res: Response) {
        const identity = req.user;
        const image = req.file as Express.Multer.File;
        const folderPath = 'uploads';

        const user = await this.usersService.findOne(identity.sub);

        if (user.avatarUrl) {
            this.cloudinaryService.deleteImage([user.publicUrl]).catch((err) => {
                res.status(200).json(ApiResponse.fail(HttpStatus.BAD_REQUEST, err.message));
            });
        }

        const { secure_url, public_id } = await this.cloudinaryService.uploadImage(image, folderPath);
        this.usersService.setAvatar(user, secure_url, public_id)
            .then((data) => {
                if (data) {
                    res.status(200).json(ApiResponse.success(data));
                } else {
                    res.status(200).json(ApiResponse.fail(HttpStatus.NOT_FOUND, "User is not found"));
                }
            })
            .catch((err) => {
                res.status(200).json(ApiResponse.fail(HttpStatus.BAD_REQUEST, err.message));
            });
    }

    @UseGuards(AuthGuard)
    @Put('updateProfile/')
    async update(
        @Body() updateUserDto: UserProfileDto,
        @Req() req,
        @Res() res: Response) {
        const userData = req.user;
        return await this.usersService.update(userData.sub, updateUserDto).then(response => {
            if (response) {
                res.status(200).json(ApiResponse.success(response));
            } else {
                res.status(200).json(ApiResponse.fail(HttpStatus.NOT_FOUND, "User is not found"));
            }
        })
            .catch(error => {
                res.status(200).json(ApiResponse.fail(HttpStatus.BAD_REQUEST, error.message));
            });
    }

    @Delete(':id')
    async remove(@Param('id') id: string, @Res() res: Response) {
        await this.usersService.remove(id).then((response) => {
            if (response) {
                res.status(200).json(ApiResponse.success(response));
            } else {
                res.status(200).json(ApiResponse.fail(HttpStatus.NOT_FOUND, "User is not found"));
            }
        })
            .catch((error) => {
                res.status(200).json(ApiResponse.fail(HttpStatus.BAD_REQUEST, error.message));
            });
    }
}
