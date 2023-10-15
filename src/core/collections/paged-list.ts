
import { IPagedListResult } from "../contracts";
import { PagingMetadata } from "./paging-metadata";

export class PagedList<T> extends PagingMetadata implements IPagedListResult<T> {
    private _subset: T[] = [];
    [index: number]: T;

    constructor(items: T[], pageNumber: number, pageSize: number, totalCount: number) {
        super(pageNumber, pageSize, totalCount);
        this._subset.push(...items);
    }

    [Symbol.iterator](): Iterator<T> {
        return this._subset[Symbol.iterator]();
    }

    get length(): number {
        return this._subset.length;
    }
}