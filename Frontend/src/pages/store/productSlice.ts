import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../../globals/types/types";
import { AppDispatch } from "./store";
import {API} from "../../http";
import { Product, ProductState } from "../../globals/types/productTypes";  
import { RootState } from "./store"
import SingleProduct from "../auth/singleProduct/SingleProduct";

const initialState:ProductState={
    product: [],
    status:Status.LOADING,
    singleProduct : null
}

const productSlice=createSlice({
    name:'product',
    initialState,
    reducers:{
        setProduct(state:ProductState,action:PayloadAction<Product[]>){  //action ma kai data auxa tyo data chai setProduct ma set garxou
            state.product=action.payload
        },
        setStatus(state:ProductState,action:PayloadAction<Status>){
            state.status=action.payload
        },
        setSingleProduct(state:ProductState,action:PayloadAction<Product>){
          state.singleProduct=action.payload
      }
    }
})

export const {setProduct, setStatus,setSingleProduct} =productSlice.actions
export default productSlice.reducer

// fetchProduct
export function fetchProduct() {
    return async function fetchProductThunk(dispatch: AppDispatch) {
      dispatch(setStatus(Status.LOADING));
      try {
        const response = await API.get("/admin/product");
        if (response.status === 200) {
          const { data } = response.data;  // `data` contains the array of products
          dispatch(setProduct(data)); // Correctly dispatch `setProduct` with the data
          dispatch(setStatus(Status.SUCCESS));
        } else {
          dispatch(setStatus(Status.ERROR));
        }
      } catch (err) {
        console.log(err);
        dispatch(setStatus(Status.ERROR));
      }
    };
  }

//fetch the single product
export function fetchSingleProduct(productId:string){
  console.log(productId)
  return async function fetchSingleProductThunk(dispatch:AppDispatch, getState:()=>RootState){ //getState function that return store
    const state=getState()
    const existingProduct=state.products.product.find((product)=>product.id===productId)
    console.log(existingProduct)
    if(existingProduct){
      dispatch(setSingleProduct(existingProduct))
      dispatch(setStatus(Status.SUCCESS))
    }else{
      dispatch(setStatus(Status.LOADING))
      try{
        const response=await API.get(`/admin/product/${productId}`)
        if(response.status===200){
          const {data}=response.data   //max mistake in destructure or not
          console.log(data)
          dispatch(setSingleProduct(data))  
          dispatch(setStatus(Status.SUCCESS))
        }else{
          dispatch(setStatus(Status.ERROR))
        }
      }catch(err){
        console.log(err)
        dispatch(setStatus(Status.ERROR))
      }
    } 
  }
}
  
