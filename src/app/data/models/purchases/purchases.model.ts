import { Products } from "../products/product.model";

export interface Purchases {
    purchase_id:   number;
    product:       Products;
    quantity:      number;
    price:         number;
    purchase_date: null;
}

