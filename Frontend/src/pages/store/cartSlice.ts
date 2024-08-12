import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../../globals/types/types";
import { CartState, CartItem } from "../../globals/types/cartTypes";
import { AppDispatch } from "./store";
import { APIAuthenticated } from "../../http";

const initialState:CartState={
    items:[],
    status:Status.LOADING
}
const cartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{
        setItems(state:CartState, action:PayloadAction<CartItem[]>){
            state.items=action.payload
        },
        setStatus(state:CartState,action:PayloadAction<Status> ){
            state.status=action.payload
        }
    }
})

export const  {setItems, setStatus} =cartSlice.actions
export default cartSlice.reducer

//add to cart function
export function addToCart(productId:string){
    return async function addToCartThunk(dispatch : AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response = await APIAuthenticated.post('/customer/cart',{
                productId,
                quantity : 1
            })
            console.log(response)
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setItems(response.data.data))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (err) {
            console.log(err)
            dispatch(setStatus(Status.ERROR))
        }
    }
}

export function fetchCartItem(){
    return async function fetchCartItemThunk(dispatch : AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response = await APIAuthenticated.get('/customer/cart',)
            console.log(response)
            if(response.status === 200){
                const {data}=response.data
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setItems(data))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (err) {
            console.log(err)
            dispatch(setStatus(Status.ERROR))
        }
    }
}
