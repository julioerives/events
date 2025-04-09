export interface Response<T> {
    data: T;
    message: string;
    error?: boolean;
}