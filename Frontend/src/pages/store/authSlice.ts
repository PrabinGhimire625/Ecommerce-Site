import { createSlice, PayloadAction } from "@reduxjs/toolkit"; 
import { Status } from "../../globals/types/types";
import {API, APIAuthenticated} from "../../http";
import { AppDispatch } from "./store";

interface RegisterData{
    username:string,
    email:string,
    password:string
}

interface LoginData{
    email : string, 
    password : string
}

interface User{
    id:string,
    username:string,
    email:string,
    password:string,
    token:string
}

interface Authstate{
    user:User,
    status:Status,
    userProfile:User | null,
    singleUser:User | null,
    token:string |null
}

export interface DeleteUser{
    userId:string
}

export interface UpdateUser{
    username:string,
    email:string
}

const initialState:Authstate={
    user:{} as User,
    status:Status.LOADING,
    userProfile:null,
    singleUser:null,
    token:null
}


const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUser(state:Authstate,action:PayloadAction<User>){
            state.user=action.payload
            console.log(state.user)
        },
        setStatus(state:Authstate, action:PayloadAction<Status>){
            state.status=action.payload
        },
        resetStatus(state:Authstate){
            state.status=Status.LOADING
        },
        setToken(state:Authstate, action:PayloadAction<string>){
            state.token=action.payload
            console.log(state.token)
        },
        setUserProfile(state:Authstate,action:PayloadAction<User>){
           console.log(state.userProfile)
            state.userProfile=action.payload
            console.log(state.userProfile)
        },
        setSingleUser(state:Authstate,action:PayloadAction<User>){
            state.singleUser=action.payload
        },
        removeUserProfile(state: Authstate) {
            state.userProfile = null;
        },
        setUpdateUser(state: Authstate, action: PayloadAction<{ id: string, username: string, email: string }>) {
            if (state.user && state.user.id === action.payload.id) {
                state.user = {
                    ...state.user,
                    username: action.payload.username,  // Update username
                    email: action.payload.email         // Update email if needed
                };
            }
        }
        
        
    }
})

export const  {setUser,setUpdateUser,setStatus,resetStatus,setToken,setUserProfile,setSingleUser,removeUserProfile} =authSlice.actions  
export default authSlice.reducer  //now go to the store

//registers
export function register(data:RegisterData){
    return async function regsterThunk(dispatch:any) {
        dispatch(setStatus(Status.LOADING))
        try{
            const response=await API.post("register", data)
            if(response.status===200){
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

//login
export function login(data:LoginData){
    return async function loginThunk(dispatch:any) {
        dispatch(setStatus(Status.LOADING))
        try{
            const response=await API.post("login",data)
            if(response.status===200){
                const {data}=response.data
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setUserProfile(data.user))
                console.log(data.token)
               dispatch(setToken(data.token))  //store in the redux toolkit
                localStorage.setItem('token',data.token)
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        }catch(err){
            console.log(err)
            dispatch(setStatus(Status.ERROR))
        }
    }
}


//fetch the user profile
export function fetchUserProfile() {
    return async function fetchUserProfileThunk(dispatch: AppDispatch) {
        dispatch(setStatus(Status.LOADING));
        try {
            const response = await APIAuthenticated.get(`/profile`);
            if (response.status === 200) {
                const { data } = response.data;
                console.log(data)
                dispatch(setUserProfile(data));
                dispatch(setStatus(Status.SUCCESS));
            } else {
                dispatch(setStatus(Status.ERROR));
            }
        } catch (error) {
            console.error(error);
            dispatch(setStatus(Status.ERROR));
        }
    }
}


//fetch single users
// export function fetchSingleUsers(id:string) {
//     return async function fetchSingleUserThunk(dispatch: AppDispatch) {
//         dispatch(setStatus(Status.LOADING));
//         try {
//             const response = await APIAuthenticated.get(`/users/${id}`);
//             if (response.status === 200) {
//                 const { data } = response.data;
//                 console.log(data)
//                 dispatch(setSingleUser(data));
//                 dispatch(setStatus(Status.SUCCESS));
//             } else {
//                 dispatch(setStatus(Status.ERROR));
//             }
//         } catch (error) {
//             console.error(error);
//             dispatch(setStatus(Status.ERROR));
//         }
//     }
// }

//delete the user

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

//update user
// update user
export function updateUser(data: UpdateUser, id: string) {
    return async function updateUserThunk(dispatch: AppDispatch) {
        dispatch(setStatus(Status.LOADING));
        try {
            const response = await APIAuthenticated.patch(`/users/${id}`, data);
            if (response.status === 200) {
                dispatch(setStatus(Status.SUCCESS));
                dispatch(setUpdateUser({ id, ...data })); // Dispatch action to update state with id and updated data
            } else {
                dispatch(setStatus(Status.ERROR));
            }
        } catch (error) {
            dispatch(setStatus(Status.ERROR));
        }
    };
}







