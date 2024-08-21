import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";

const store=configureStore({
    reducer:{
        datas:dataSlice
    }
})

export  default store
//useDispatch and useSelector
export type AppDispatch=typeof store.dispatch  //useDispatch type
export type RootState=ReturnType<typeof store.getState> //generic type        //useSelector type


