import { HttpStatus } from "@nestjs/common";

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

    static Success<T>(result: T, statusCode: HttpStatus = HttpStatus.OK): ApiResponseWithResult<T> {
        return new ApiResponseWithResult<T>(statusCode, [], result, true);
    }

    static FailWithResult<T>(statusCode: HttpStatus, result: T, ...errorMessages: string[]): ApiResponseWithResult<T> {
        return new ApiResponseWithResult<T>(statusCode, errorMessages, result, false);
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

export class ApiResponseWithResult<T> extends ApiResponse {
    public readonly Result: T;

    constructor(statusCode: HttpStatus = HttpStatus.OK, errors: string[] = [], result?: T, isSuccess: boolean = false) {
        super(statusCode, errors);
        this.Result = result;
        this.IsSuccess = isSuccess;
    }

}