import { Product } from "./productTypes"
import { Status } from "./types"




//payment type start
export enum PaymentMethod{
    COD = 'cod',
    KHALTI = 'khalti'
}

enum PaymentStatus{
    Paid = 'paid',
    Unpaid = 'unpaid',
    Pending = 'pending'

}
interface Payment{
    paymentMethod : PaymentMethod
}

interface OrderPaymentData extends Payment{
    paymentStatus : PaymentStatus
}
//payment end


//order type start
export enum OrderStatus{
    Pending = 'pending',
    Delivered = 'delivered',
    Ontheway = 'ontheway',
    Cancel = 'cancelled',
    Preparation = 'preparation',
    All = 'all'
}

export interface ItemDetails{
    productId : string, 
    quantity : number
}

export interface OrderResponseItem extends ItemDetails{
    orderId : string
}
//order type end



//main data before order 
export interface OrderData{
    phoneNumber : string, 
    shippingAddress : string, 
    totalAmount : number, 
    paymentDetails : Payment,
    items : ItemDetails[]
}






export interface OrderResponseData{
   items : OrderResponseItem[],
   status : Status, 
   khaltiUrl:string | null,
   myOrders:MyOrdersData[]
}

interface UserData{
    username : string, 
    email : string 
}


//get myOrders types
export interface MyOrdersData{
    id: string,
    phoneNumber: string,
    shippingAddress: string,
    totalAmount: number,
    orderStatus: OrderStatus,
    createdAt: string,
    paymentId: string,
    userId: UserData,
    Payment : OrderPaymentData
}



//for order details
export interface OrderDetails {
    id : string, 
    quantity : number , 
    orderId : string, 
    Product : Product,
    Order : MyOrdersData
}