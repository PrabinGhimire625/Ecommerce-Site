import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import { InitialState, OrderData, User , Product, Category, SingleOrder} from "../types/data"
import { Status } from "../types/status"
import { AppDispatch } from "./store"
import { APIAuthenticated } from "../http"

export interface AddProducts{
      productName: string,
      productDescription: string,
      productPrice: number,
      productTotalStockQty: number,
      image: null,
      categoryId:string
  }


const initialState:InitialState={
    products:[],
    users:[],
    orders:[],
    category:[],
    status:Status.LOADING,
    singleProduct:null,
    singleCategory:null,
    singleOrder:[]
}

export interface DeleteProduct{
    productId:string
}

export interface UpdateProduct{
    productId:string,
    id:string
    productName:string,
    productDescription:string,
    productPrice:number,
    productTotalStockQty:number,
    productImageUrl:string
}

export interface DeleteOrder{
    orderId:string

}
export interface DeleteUser{
    userId:string
}

export interface DeleteCategory{
    categoryId:string
}

export interface UpdateCategory{
    categoryName:string
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
        setDeleteUser(state:InitialState, action:PayloadAction<DeleteUser>){
            const index=state.users.findIndex(item=>item.id=action.payload.userId) 
            state.users.splice(index, 1)  
        },
        setProduct(state:InitialState, action:PayloadAction<Product[]>){
            state.products=action.payload
        },
        setCategory(state:InitialState, action:PayloadAction<Category[]>){
            state.category=action.payload
        },
        setOrder(state:InitialState, action:PayloadAction<OrderData[]>){
            state.orders=action.payload
        },
        setSingleProduct(state:InitialState, action:PayloadAction<Product>){
            state.singleProduct=action.payload
        },

        setSingleOrder(state:InitialState,action:PayloadAction<SingleOrder[]>){
            state.singleOrder=action.payload
        },
        setSingleCategory(state:InitialState, action:PayloadAction<Category>){
            state.singleCategory=action.payload
        },
       
        //items array bata tyo particular cart item hatauna  //refresh garipaxi matra delete huna problem fixed garxa state bata pani deete garxa
        setDeleteProduct(state:InitialState, action:PayloadAction<DeleteProduct>){
            const index=state.products.findIndex(item=>item.id=action.payload.productId) // find the index of an item in an array (state.items) where the product.id matches the productId provided in the action.payload.
            state.products.splice(index, 1)   // removes one item starting at the position index
        },
        setDeleteCategory(state:InitialState, action:PayloadAction<DeleteCategory>){
            const index=state.category.findIndex(item=>item.id=action.payload.categoryId) // find the index of an item in an array (state.items) where the product.id matches the productId provided in the action.payload.
            state.category.splice(index, 1)   // removes one item starting at the position index
        },
        setDeleteOrder(state:InitialState, action:PayloadAction<DeleteOrder>){
            const index=state.orders.findIndex(item=>item.id=action.payload.orderId) // find the index of an item in an array (state.items) where the product.id matches the productId provided in the action.payload.
            state.orders.splice(index, 1)   // removes one item starting at the position index
        },
           // setOrderStatus(state:InititalState,action:PayloadAction<{id:string,status:string}>){
        //     state.singleOrder
        // },
        setUpdateProduct(state: InitialState, action: PayloadAction<UpdateProduct>){
            const index = state.products.findIndex(item => item.id === action.payload.productId);
            if (index !== -1) {
              state.products[index] = {
                ...state.products[index], // retain other properties if necessary
                productName: action.payload.productName,
                productDescription: action.payload.productDescription,
                productPrice: action.payload.productPrice,
                productTotalStockQty: action.payload.productTotalStockQty,
                productImageUrl: action.payload.productImageUrl
              };
            }
        },
        setUpdateCategory(state: InitialState, action: PayloadAction<{ id: string, categoryName: string }>) {
            const index = state.category.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.category[index] = {
                    ...state.category[index],
                    categoryName: action.payload.categoryName
                };
            }
        }
        
    }
})

export const {setStatus,setSingleOrder,setUser,setUpdateCategory,setSingleCategory,setDeleteCategory,setCategory,setProduct,setOrder,setSingleProduct,setDeleteProduct,setDeleteUser,setDeleteOrder}=dataSlice.actions
export default dataSlice.reducer

//fetch all users
export function fetchAllUsers(){
    return async function fetchAllOrdersThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try{
            const respose=await APIAuthenticated.get("/users")
            if(respose.status===200){
                const {data} =respose.data
                console.log(data)
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

//delete user
export function deleteUser(id:string){
    return async function deleteUserThunk(dispatch : AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response = await APIAuthenticated.delete('/users/' + id)
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
export function addProduct(data:AddProducts){
    return async function addProductThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try{
            const response=await APIAuthenticated.post("/admin/product",data,{
                headers:{
                    'Content-Type':"multipart/form-data"
                }
            })
            console.log(response)
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
            console.log(respose)
            if(respose.status===200){
                const {data} =respose.data
                console.log(data)
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


export function deleteOrder(id:string){
    return async function deleteOrderThunk(dispatch : AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response = await APIAuthenticated.delete('/order/admin/' + id)
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


export function fetchSingleOrder(id:string){
    return async function fetchSingleOrder(dispatch : AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response = await APIAuthenticated.get('/order/customer/' + id)
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setSingleOrder(response.data.data)) 
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
    }
}



//add category
export function addCategory(data:{categoryName:string}){
    return async function addCategoryThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try{
            const response=await APIAuthenticated.post("/admin/category",data)
            console.log(response)
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
//fetch category
export function fetchCategory(){
    return async function fetchCategoryThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try{
            const respose=await APIAuthenticated.get("admin/category")
            console.log(respose)
            if(respose.status===200){
                const {data} =respose.data
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setCategory(data))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        }catch(err){
            console.log(err)
            dispatch(setStatus(Status.ERROR))
        }        
    }
}


//fetch  single category

export function fetchSingleCategory(id:string){
    return async function fetchSingleCategoryThunk(dispatch : AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response = await APIAuthenticated.get('/admin/category/' + id)
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setSingleCategory(response.data.data)) 
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
        }
    }
}

//delete category
export function deleteCategory(id:string){
    return async function deleteCategoryThunk(dispatch : AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response = await APIAuthenticated.delete('/admin/category/' + id)
            console.log(response)
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


//update category
export function updateCategory(data: UpdateCategory, id: string) {
    return async function updateCategoryThunk(dispatch: AppDispatch) {
        dispatch(setStatus(Status.LOADING));
        try {
            const response = await APIAuthenticated.patch(`/admin/category/${id}`, data);
            if (response.status === 200) {
                dispatch(setStatus(Status.SUCCESS));
                dispatch(setUpdateCategory({ id, categoryName: data.categoryName })); // dispatch action to update state
            } else {
                dispatch(setStatus(Status.ERROR));
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR));
        }
    };
}

// export function handleOrderStatus(status:string,id:string){
//     return async function handleOrderStatusThunk(dispatch : AppDispatch){
//         dispatch(setStatus(Status.LOADING))
//         try {
//             const response = await APIAuthenticated.get('/order/admin/' + id)
//             if(response.status === 200){
//                 dispatch(setStatus(Status.SUCCESS))
//                 dispatch(setOrderStatus({id,status}))
//             }else{
//                 dispatch(setStatus(Status.ERROR))
//             }
//         } catch (error) {
//             dispatch(setStatus(Status.ERROR))
//         }
//     }
// }



