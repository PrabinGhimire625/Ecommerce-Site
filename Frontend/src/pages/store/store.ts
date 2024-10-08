import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";
import CheckoutSlice from "./CheckoutSlice";
import categorySlice from "./categorySlice";
import reviewSlice from "./reviewSlice";

//all silce store inside the store.ts
const store=configureStore({
    reducer:{
        auth:authSlice,
        products:productSlice,
        carts:cartSlice,
        orders:CheckoutSlice,
        category:categorySlice,
        review:reviewSlice

    }
})

export default store
//useDispatch and useSelector
export type AppDispatch=typeof store.dispatch  //useDispatch type
export type RootState=ReturnType<typeof store.getState> //generic type        //useSelector type


