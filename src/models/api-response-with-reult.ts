import { HttpStatus } from "@nestjs/common";
import { ApiResponse } from "./api-response";

export class ApiResponseWithResult<T> extends ApiResponse {
    public readonly Result: T;
    public IsSuccess: boolean;

    constructor(statusCode: HttpStatus = HttpStatus.OK, errors: string[] = [], result?: T, isSuccess: boolean = false) {
        super(statusCode, errors);
        this.Result = result;
        this.IsSuccess = isSuccess;
    }
}