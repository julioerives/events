export interface Response<T> {
    data: T;
    message: string;
    error?: boolean;
}

export interface PaginatorResponse<T> {
    content:       T[];
    pageNumber:    number;
    pageSize:      number;
    totalElements: number;
    totalPages:    number;
}