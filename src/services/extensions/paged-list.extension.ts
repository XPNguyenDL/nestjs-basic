import { PagedList } from "../../core/collections";
import { IPagingParams } from "../../core/contracts";

export class PagedListExtensions {
    static toPagedList(
        source: any,
        param1: IPagingParams | number,
        param2?: number | string,
        param3?: string,
        param4?: string
    ) {
        let pageNumber: number;
        let pageSize: number;
        let sortColumn: string;
        let sortOrder: string;
    
        if (typeof param1 === 'object' && param1 !== null) {
            const pagingParams = param1 as IPagingParams;
            pageNumber = pagingParams.pageNumber || 1;
            pageSize = pagingParams.pageSize || 10;
            sortColumn = pagingParams.sortColumn || '_id';
            sortOrder = pagingParams.sortOrder || 'DESC';
        } else {
            pageNumber = param1 as number;
            pageSize = param2 as number || 10;
            sortColumn = param3 as string || '_id';
            sortOrder = param4 as string || 'DESC';
        }
        
        const totalCount = source.length;
        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize, totalCount);
        
        const items = source.slice(startIndex, endIndex);
        return new PagedList(items, pageNumber, pageSize, totalCount);
    }
}
