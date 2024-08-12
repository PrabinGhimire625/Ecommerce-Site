import { Product } from "./productTypes";
import { Status } from "./types";

export interface CartItem{
    Product:Product,
    quantity:number
}

export interface CartState{
    items:CartItem[],
    status:Status
}