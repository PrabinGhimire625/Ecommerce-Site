import { Product } from "./productTypes";
import { Status } from "./types";

export interface CartItem{
    Product:Product,
    quantity:number,
    productId:string
}

export interface CartState{
    items:CartItem[],
    status:Status
}