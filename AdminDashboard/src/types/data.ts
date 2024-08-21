import { Status } from "./status"

export interface User{
    id:string,
    email:string,
    username:string
}

export interface Category{
    id:string,
    categoryName:string,
}

export interface Product{
    id:string
    productName:string,
    productDescription:string,
    productPrice:number,
    productTotalStockQty:number,
    productImageUrl:string,
    createdAt:string,
    updatedAt:string,
    userId:string,
    categoryId:string
    User:User,
    Category: Category
}

//for orders
export enum PaymentMethod{
    COD = 'cod',
    KHALTI = 'khalti'
}

interface Payment{
    paymentMethod : PaymentMethod
}

export interface ItemDetails{
    productId : string, 
    quantity : number
}

//main data before order 
export interface OrderData{
    phoneNumber : string, 
    shippingAddress : string, 
    totalAmount : number, 
    paymentDetails : Payment,
    items : ItemDetails[]
}


//main initialstate
export interface InitialState{
    products:Product[],
    users:User[],
    orders: OrderData[],
    status:Status,
    singleProduct:Product | null
}


