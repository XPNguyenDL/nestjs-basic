import { HttpStatus } from "@nestjs/common";

export class ApiResponse {
    private _errors: Array<string> = [];

    public isSuccess: boolean = typeof this.errors === 'undefined' ? false : this.errors.length === 0;


    public statusCode: HttpStatus;

    constructor(statusCode: HttpStatus = HttpStatus.OK, errors: string[] = [], isSuccess: boolean = false) {
        this.statusCode = statusCode;
        this.errors = errors;
        this.isSuccess = isSuccess;
    }

    protected ApiResponse() {
        this.statusCode = HttpStatus.OK;
        this.errors = new Array<string>();
    }

    static success<T>(result: T, statusCode: HttpStatus = HttpStatus.OK): ApiResponseWithResult<T> {
        return new ApiResponseWithResult<T>(statusCode, [], result, true);
    }

    static failWithResult<T>(statusCode: HttpStatus, result: T, ...errorMessages: string[]): ApiResponseWithResult<T> {
        return new ApiResponseWithResult<T>(statusCode, errorMessages, result, false);
    }

    static fail(statusCode: HttpStatus, ...errorMessages: string[]): ApiResponse {
        if (errorMessages?.length === 0) {
            throw new Error('errorMessages must not be empty.');
        }

        return new ApiResponse(statusCode, errorMessages, false);
    }

    public get errors(): Array<string> {
        return this._errors;
    }
    public set errors(value: Array<string>) {
        this._errors = value;
    }
}

export class ApiResponseWithResult<T> extends ApiResponse {
    public readonly result: T;

    constructor(statusCode: HttpStatus = HttpStatus.OK, errors: string[] = [], result?: T, isSuccess: boolean = false) {
        super(statusCode, errors);
        this.result = result;
        this.isSuccess = isSuccess;
    }

}