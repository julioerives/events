export interface Products {
    productId:   number;
    productType: ProductType;
    price:       number;
    name:        string;
    createdAt?:   Date;
}

export interface ProductType {
    productTypeId: number;
    name:          string;
    description:   string;
    colorRgba?:     string;
}
