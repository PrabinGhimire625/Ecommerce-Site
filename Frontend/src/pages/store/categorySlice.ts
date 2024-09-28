import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../../globals/types/types";
import { AppDispatch } from "./store";
import { API } from "../../http";

export interface Category{
    id:string,
    categoryName:string,
    categoryImageUrl:string,
}


export interface CategoryState{
    category:Category[],
    status:Status
}


const initialState:CategoryState={
    category:[],
    status:Status.LOADING
}


const categorySlice=createSlice({
    name:"category",
    initialState,
    reducers:{
        setCategory(state:CategoryState,action:PayloadAction<Category[]>){
            state.category=action.payload
        },
        setStatus(state:CategoryState,action:PayloadAction<Status>){
            state.status=action.payload
        }
    }

})

export const {setCategory,setStatus}=categorySlice.actions
export default categorySlice.reducer

export function fetchAllCategory(){
    return async function fetchAllCategoryThunk(dispatch:AppDispatch) {
        dispatch(setStatus(Status.LOADING))
        try{
            const response=await API.get("/admin/category")
            if(response.status===200){
                const {data}=response.data
                dispatch(setCategory(data))
                dispatch(setStatus(Status.SUCCESS))    
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        }catch(err){
            console.log(err)
        }
    }
}