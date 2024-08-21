import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import { InitialState, OrderData, User , Product} from "../types/data"
import { Status } from "../types/status"
import { AppDispatch } from "./store"
import { APIAuthenticated } from "../http"

const initialState:InitialState={
    products:[],
    users:[],
    orders:[],
    status:Status.LOADING,
    singleProduct:null
}

const dataSlice=createSlice({
    name:"data",
    initialState,
    reducers:{  //reduce le state ko key ma data lagara set gardinxa
        setStatus(state:InitialState,action:PayloadAction<Status>){
            state.status=action.payload
        },
        setUser(state:InitialState, action:PayloadAction<User[]>){
            state.users=action.payload
        },
        setProduct(state:InitialState, action:PayloadAction<Product[]>){
            state.products=action.payload
        },
        setOrder(state:InitialState, action:PayloadAction<OrderData[]>){
            state.orders=action.payload
        },
        setSingleProduct(state:InitialState, action:PayloadAction<Product>){
            state.singleProduct=action.payload
        }
    }
})

export const {setStatus,setUser,setProduct,setOrder,setSingleProduct}=dataSlice.actions
export default dataSlice.reducer

//fetch all orders
export function fetchAllUsers(){
    return async function fetchAllOrdersThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try{
            const respose=await APIAuthenticated.get("/users")
            if(respose.status===200){
                const {data} =respose.data
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setUser(data))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        }catch(err){
            dispatch(setStatus(Status.ERROR))
        }        
    }
}

//hit the api and fetch the data 
export function fetchProduct(){
    return async function fetchProductThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try{
            const respose=await APIAuthenticated.get("admin/product")
            if(respose.status===200){
                const {data} =respose.data
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setProduct(data))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        }catch(err){
            dispatch(setStatus(Status.ERROR))
        }        
    }
}


//addProduct
export function addProduct(data:Product){
    return async function addProductThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try{
            const response=await APIAuthenticated.post("/admin/product",data)
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        }catch(err){
            dispatch(setStatus(Status.ERROR))
        }     
    }
}

export function deleteProduct(id:string){
    return async function deleteProductThunk(dispatch : AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response = await APIAuthenticated.delete('/admin/product/' + id)
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
                
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
    }
}


export function fetchSingleProduct(id:string){
    return async function fetchSingleProductThunk(dispatch : AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response = await APIAuthenticated.get('/admin/product/' + id)
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setSingleProduct(response.data.data)) 
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
    }
}


//fetch all orders
export function fetchAllOrders(){
    return async function fetchAllOrdersThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try{
            const respose=await APIAuthenticated.get("/order")
            if(respose.status===200){
                const {data} =respose.data
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setOrder(data))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        }catch(err){
            dispatch(setStatus(Status.ERROR))
        }        
    }
}






