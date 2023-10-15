import { IPagedListResult } from "../contracts";
import { PagingMetadata } from "./paging-metadata";

export class PaginationResult<T> {
    items: Array<T>;
    metadata: PagingMetadata;

    constructor(pagedList: IPagedListResult<T>) {
        this.items = [...pagedList]; // Convert IPagedList to an array
        this.metadata = new PagingMetadata(pagedList).exportInfo();
    }
}