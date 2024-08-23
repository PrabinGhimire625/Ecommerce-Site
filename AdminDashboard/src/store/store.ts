import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";
import authSlice from "./authSlice";

const store=configureStore({
    reducer:{
        datas:dataSlice,
        auth:authSlice
    }
})

export  default store
//useDispatch and useSelector
export type AppDispatch=typeof store.dispatch  //useDispatch type
export type RootState=ReturnType<typeof store.getState> //generic type        //useSelector type


