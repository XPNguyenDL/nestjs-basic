import { ApiProperty } from "@nestjs/swagger";
import { IPagingParams } from "../core/contracts";

export class PagingModel implements IPagingParams {
    @ApiProperty({
        required: false
    })
    pageNumber: number | null = 1;

    @ApiProperty({
        required: false
    })
    pageSize: number | null = 10;
    
    @ApiProperty({
        required: false
    })
    sortColumn: string = '_id';
    
    @ApiProperty({
        required: false
    })
    sortOrder: string = 'DESC';
}