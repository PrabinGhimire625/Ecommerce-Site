import { createSlice, PayloadAction } from "@reduxjs/toolkit"; 
import { Status } from "../types/status";
import { AppDispatch } from "./store";
import { API } from "../http";


interface LoginData{
    email : string, 
    password : string
}

interface User{
    username:string | null,
    email:string | null ,
    password:string | null,
    token:string | null
}

interface Authstate{
    user:User,
    status:Status,
    token:string | null
}

const initialState:Authstate={
    user:{} as User,
    status:Status.LOADING,
    token: null
}

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUser(state:Authstate,action:PayloadAction<User>){
            state.user=action.payload
        },
        setStatus(state:Authstate, action:PayloadAction<Status>){
            state.status=action.payload
        },
        resetStatus(state:Authstate){
            state.status=Status.LOADING
        },
        setToken(state:Authstate, action:PayloadAction<string>){
            state.user.token=action.payload
        },
        // handle logout by frontend 
        setUserLogout(state:Authstate){
            state.token=null
            state.user={
                email:null,
                password:null,
                username:null,
                token:null
            }
        }, 
    }
})

export const  {setUser,setStatus,resetStatus,setToken,setUserLogout} =authSlice.actions  
export default authSlice.reducer  //now go to the store

//login
export function login(data:LoginData){
    return async function loginThunk(dispatch:AppDispatch) {
        dispatch(setStatus(Status.LOADING))
        try{
            const response=await API.post("login",data)
            if(response.status===200){
                const {data}=response.data
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setToken(data))  //store in the redux toolkit
                localStorage.setItem('token',data)
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        }catch(err){
            console.log(err)
            dispatch(setStatus(Status.ERROR))
        }
    }
}





