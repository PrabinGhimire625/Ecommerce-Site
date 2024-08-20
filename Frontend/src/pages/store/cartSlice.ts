import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../../globals/types/types";
import { CartState, CartItem } from "../../globals/types/cartTypes";
import { AppDispatch } from "./store";
import { APIAuthenticated } from "../../http";

//items array bhitra gayara store ma store hunxa cart data
const initialState:CartState={ 
    items:[],
    status:Status.LOADING
}

interface DeleteAction{
    productId:string
}

//extends access the productId also
interface updateAction extends DeleteAction{
    quantity:number
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
        },
        //items array bata tyo particular cart item hatauna
        setDeleteItem(state:CartState, action:PayloadAction<DeleteAction>){
            const index=state.items.findIndex(item=>item.Product.id=action.payload.productId) // find the index of an item in an array (state.items) where the product.id matches the productId provided in the action.payload.
            state.items.splice(index, 1)   // removes one item starting at the position index
        },
        setUpdateItem(state:CartState, action:PayloadAction<updateAction>){
            const index=state.items.findIndex(item=>item.Product.id=action.payload.productId)
            if(index !==-1){  //if the item was found in the array.
                state.items[index].quantity=action.payload.quantity  //updates the item's quantity in the cart.
            }
        },
    }
})

export const  {setItems, setStatus,setDeleteItem,setUpdateItem} =cartSlice.actions
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

//get all the cart items
export function fetchCartItem(){
    return async function fetchCartItemThunk(dispatch : AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response = await APIAuthenticated.get('/customer/cart')
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

//delete particular cart item 
export function deleteCartItem(productId:string){
    return async function deleteCartItemThunk(dispatch : AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response = await APIAuthenticated.delete(`/customer/cart/${productId}`)
            console.log(response)
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setDeleteItem({productId}))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (err) {
            console.log(err)
            dispatch(setStatus(Status.ERROR))
        }
    }
}

export function updateCartItem(productId:string, quantity:number){
    return async function updateCartItemThunk(dispatch : AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response = await APIAuthenticated.patch(`/customer/cart/${productId}`,{quantity})
            console.log(response)
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setUpdateItem({productId,quantity}))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (err) {
            console.log(err)
            dispatch(setStatus(Status.ERROR))
        }
    }
}



