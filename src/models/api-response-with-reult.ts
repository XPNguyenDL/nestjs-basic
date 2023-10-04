import { ApiResponse } from "./api-response";

export class ApiResponseWithResult<T> extends ApiResponse {
    private _Result: T;

    public get Result(): T {
        return this._Result;
    }
    public set Result(value: T) {
        this._Result = value;
    }
}