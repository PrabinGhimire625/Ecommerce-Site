import { createSlice, PayloadAction } from "@reduxjs/toolkit"; 
import axios from "axios";
interface RegisterData{
    username:string,
    email:string,
    password:string
}

interface User{
    username:string,
    email:string,
    password:string,
    token:string
}

interface Authstate{
    user:User
    status:string
}

const initialState:Authstate={
    user:{} as User,
    status:""
}

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUser(state:Authstate,action:PayloadAction<User>){
            state.user=action.payload
        },
        setStatus(state:Authstate, action:PayloadAction<string>){
            state.status=action.payload
        }
    }
})

export const  {setUser,setStatus} =authSlice.actions
export default authSlice.reducer

//register
export function register(data:RegisterData){
    return async function regsterThunk(dispatch:any) {
        dispatch(setStatus("loading"))
        try{
            const response=await axios.post("http://localhost:3000/register", data)
            if(response.status===200){
                dispatch(setStatus("Succcess"))
            }else{
                dispatch(setStatus("error"))
            }
        }catch(err){
            console.log(err)
            dispatch(setStatus("error"))
        }
    }
}

//login
export function login(data:RegisterData){
    return async function loginThunk(dispatch:any) {
        dispatch(setStatus("loading"))
        try{
            const response=await axios.post("http://localhost:3000/login",data)
            if(response.status===200){
                dispatch(setStatus("success"))
            }else{
                dispatch(setStatus("error"))
            }
        }catch(err){
            console.log(err)
            dispatch(setStatus("error"))
        }
    }
}