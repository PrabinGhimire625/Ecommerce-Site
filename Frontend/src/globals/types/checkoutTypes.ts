export enum PaymentMethod{
    COD="cod",
    KHALTI="khalti"
}

export interface ItemDetails{
    prductId:string,
    quantity:number
}


export interface OrderData{
    phoneNumber: string,
    shippingAddress: string,
    totalAmount: number,
    paymentDetails:{
      paymentMethod : PaymentMethod
    },
    items: ItemDetails[]
}
