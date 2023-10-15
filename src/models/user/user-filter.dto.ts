import { ApiProperty } from "@nestjs/swagger";
import { PagingModel } from "../paging.model";

export class UserFilter extends PagingModel {
    @ApiProperty({
        required: false,
        type: String
    })
    keyword?: string = '';
}