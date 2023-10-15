import { IPagedList } from "../contracts";

export class PagingMetadata implements IPagedList {
    totalItemCount: number;
    pageIndex: number;
    pageSize: number;

    constructor(pageNumberOrPagedList: number | IPagedList, pageSize: number = 10, totalCount: number = 0) {
        if (typeof pageNumberOrPagedList === 'number') {
          // Xử lý trường hợp đầu tiên - sử dụng các tham số số
          this.pageIndex = pageNumberOrPagedList - 1;
          this.pageSize = pageSize;
          this.totalItemCount = totalCount;
        } else {
          // Xử lý trường hợp thứ hai - sử dụng một đối tượng IPagedList
          this.pageIndex = pageNumberOrPagedList.pageIndex;
          this.pageSize = pageNumberOrPagedList.pageSize;
          this.totalItemCount = pageNumberOrPagedList.totalItemCount;
          // lấy các thông tin còn lại ra 
        }
    }

    exportInfo(): any {
      return {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        totalItemCount: this.totalItemCount,
        pageNumber: this.pageNumber,
        pageCount: this.pageCount,
        hasPreviousPage: this.hasPreviousPage,
        hasNextPage: this.hasNextPage,
        firstItemIndex: this.firstItemIndex,
        lastItemIndex: this.lastItemIndex,
        isFirstPage: this.isFirstPage,
        isLastPage: this.isLastPage,
      };
    }

    get pageNumber(): number {
        return this.pageIndex + 1;
    }

    set pageNumber(value: number) {
        this.pageIndex = value - 1;
    }

    get pageCount(): number {
        if (this.pageSize === 0) {
            return 0;
        }

        const total = Math.floor(this.totalItemCount / this.pageSize);

        if (this.totalItemCount % this.pageSize > 0) {
            return total + 1;
        }

        return total;
    }

    get hasPreviousPage(): boolean {
        return this.pageIndex > 0;
      }
    
      get hasNextPage(): boolean {
        return this.pageIndex < (this.pageCount - 1);
      }
    
      get firstItemIndex(): number {
        return this.pageIndex * this.pageSize + 1;
      }
    
      get lastItemIndex(): number {
        return Math.min(
          this.totalItemCount,
          this.pageIndex * this.pageSize + this.pageSize
        );
      }
    
      get isFirstPage(): boolean {
        return this.pageIndex <= 0;
      }
    
      get isLastPage(): boolean {
        return this.pageIndex >= this.pageCount - 1;
      }
}