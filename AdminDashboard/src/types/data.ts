import { Status } from "./status"

export interface User{
    id:string,
    email:string,
    username:string,
    createdAt:string
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
    createdAt?:string | null,
    updatedAt?:string,
    userId:string,
    categoryId:string
    User?:User,
    Category?: Category
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


//order type start
export enum OrderStatus{
    Pending = 'pending',
    Delivered = 'delivered',
    Ontheway = 'ontheway',
    Cancel = 'cancelled',
    Preparation = 'preparation',
    All = 'all'
}


//main data before order 
export interface OrderData{
    id:string,
    phoneNumber : string, 
    shippingAddress : string, 
    totalAmount : number, 
    paymentDetails : Payment,
    items : ItemDetails[],
    orderStatus:OrderStatus
}

export interface CategoryData{
    id:string,
    categoryName:string
}
//main initialstate
export interface InitialState{
    products:Product[],
    users:User[],
    orders: OrderData[],
    category:CategoryData[],
    status:Status,
    singleProduct:Product | null
}


