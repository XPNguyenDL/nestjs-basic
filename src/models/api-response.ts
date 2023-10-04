import { HttpStatus } from "@nestjs/common";
import { ApiResponseWithReult } from "./api-response-with-reult";

export class ApiResponse {
    private _Errors: Array<string> = [];

    public IsSuccess: boolean = typeof this.Errors === 'undefined' ? false : this.Errors.length === 0;


    public StatusCode: HttpStatus;

    constructor(statusCode: HttpStatus = HttpStatus.OK, errors: string[] = [], isSuccess: boolean = false) {
        this.StatusCode = statusCode;
        this.Errors = errors;
        this.IsSuccess = isSuccess;
    }

    protected ApiResponse() {
        this.StatusCode = HttpStatus.OK;
        this.Errors = new Array<string>();
    }

    static Success<T>(result: T, statusCode: HttpStatus = HttpStatus.OK): ApiResponseWithReult<T> {
        return new ApiResponseWithReult<T>(statusCode, [], result, true);
    }

    static FailWithResult<T>(statusCode: HttpStatus, result: T, ...errorMessages: string[]): ApiResponseWithReult<T> {
        return new ApiResponseWithReult<T>(statusCode, errorMessages, result, false);
    }

    static Fail(statusCode: HttpStatus, ...errorMessages: string[]): ApiResponse {
        if (errorMessages?.length === 0) {
            throw new Error('errorMessages must not be empty.');
        }

        return new ApiResponse(statusCode, errorMessages, false);
    }

    public get Errors(): Array<string> {
        return this._Errors;
    }
    public set Errors(value: Array<string>) {
        this._Errors = value;
    }
}

