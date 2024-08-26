import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../../globals/types/types";
import { MyOrdersData, OrderData, OrderDetails, OrderResponseData, OrderResponseItem } from "../../globals/types/checkoutTypes";
import { act } from "react";
import { AppDispatch } from "./store";
import { APIAuthenticated } from "../../http";

const initialState:OrderResponseData = {
    items : [],
    status : Status.LOADING,
    khaltiUrl:null,  //for khalti
    myOrders:[],
    OrderDetails:[]
}

const orderSlice=createSlice({
    name:"order",
    initialState,
    reducers:{
        setItems(state:OrderResponseData, action:PayloadAction<OrderResponseItem>){
            state.items.push(action.payload)
        },
        setStatus(state:OrderResponseData,action:PayloadAction<Status>){
            state.status=action.payload
        },
        setKhaltiUrl(state:OrderResponseData,action:PayloadAction<OrderResponseData['khaltiUrl']>){
           state.khaltiUrl=action.payload
        },
        setMyOrders(state:OrderResponseData, action:PayloadAction<MyOrdersData[]>){
            state.myOrders=action.payload
        },
        setMyOrdersDetails(state:OrderResponseData, action:PayloadAction<OrderDetails[]>){
            state.OrderDetails=action.payload
        },
    }
})

export const {setItems,setStatus,setKhaltiUrl,setMyOrders,setMyOrdersDetails}=orderSlice.actions
export default orderSlice.reducer

// fetch order 
export function orderItem(data:OrderData){
    return async function orderItemThunk(dispatch:AppDispatch) {
        dispatch(setStatus(Status.LOADING))
        try{
            const response=await APIAuthenticated.post("/order",data)
            if(response.status===200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setItems(response.data.data))
                //url from backend
                if(response.data.url){
                    dispatch(setKhaltiUrl(response.data.url))
                }else{
                    dispatch(setKhaltiUrl(null))

                }
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        }catch(err){
            dispatch(setStatus(Status.ERROR))
        }  
    }
}

export function fetchMyOrder(){
    return async function fetchMyOrderThunk(dispatch:AppDispatch) {
        dispatch(setStatus(Status.LOADING))
        try{
            const response=await APIAuthenticated.get("/order/customer")
            if(response.status===200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setMyOrders(response.data.data))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        }catch(err){
            dispatch(setStatus(Status.ERROR))
        }  
    }
}


//fetch the order of the singleorders
export function fetchMyOrderDetails(id:string){
    return async function fetchMyOrderDetailsThunk(dispatch:AppDispatch) {
        dispatch(setStatus(Status.LOADING))
        try{
            const response=await APIAuthenticated.get('/order/customer/' + id)
            console.log(response)
            if(response.status===200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setMyOrdersDetails(response.data.data))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        }catch(err){
            console.log(err)
            dispatch(setStatus(Status.ERROR))
        }  
    }
}
