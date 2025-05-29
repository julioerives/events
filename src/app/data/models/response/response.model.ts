export interface Response<T> {
    data: T;
    message: string;
    error?: boolean;
}

export interface PaginatorResponse<T> {
    content: T[];
    pagination: Pagination;

}
export interface Pagination {
    currentPage: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
    first: boolean;
    last: boolean;
}
