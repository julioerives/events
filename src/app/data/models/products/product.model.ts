export interface Products {
    productId:   number;
    productType: ProductType;
    price:       number;
    name:        string;
    createdAt:   null;
}

export interface ProductType {
    productTypeId: number;
    name:          string;
    description:   string;
    colorRgba:     null;
}
