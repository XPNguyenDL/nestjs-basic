
export interface IPagedList {
    pageCount: number;

    totalItemCount: number;

    pageIndex: number;

    pageNumber: number;

    pageSize: number;

    hasNextPage: boolean;

    hasPreviousPage: boolean;

    isFirstPage: boolean;
    
    isLastPage: boolean;

    firstItemIndex: number;

    lastItemIndex: number;
}

export interface IPagedListResult<T> extends IPagedList, Iterable<T> {
    [index: number]: T;
    length: number;
}