import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../../globals/types/types";
import { AppDispatch } from "./store";
import { APIAuthenticated } from "../../http";

export interface AddReview{
    productId:string,
    rating:number,
    message:string
}

export interface Review{
    id:string,
    rating:number,
    message:string
}

export interface reviewState{
    review:Review[],
    status:Status
}

const initialState:reviewState={
    review:[],
    status:Status.LOADING
}

const reviewSlice=createSlice({
    name:"review",
    initialState,
    reducers:{
        setReview(state:reviewState,action:PayloadAction<Review[]>){  //action ma kai data auxa tyo data chai setProduct ma set garxou
            state.review=action.payload
        },
        setStatus(state:reviewState,action:PayloadAction<Status>){
            state.status=action.payload
        },
    }
})

export const {setReview,setStatus}=reviewSlice.actions
export default reviewSlice.reducer


// addReview action
export function addReview(data: AddReview) {
    return async function addReviewThunk(dispatch: AppDispatch) {
        dispatch(setStatus(Status.LOADING));
        try {
            const response = await APIAuthenticated.post("/review", data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                dispatch(setStatus(Status.SUCCESS));
                // Optionally, add the new review to the state here
            } else {
                dispatch(setStatus(Status.ERROR));
                console.error("Failed to save review:", response.data); // Log any response data for troubleshooting
            }
        } catch (err) {
            dispatch(setStatus(Status.ERROR));
            console.error("Error adding review:", err); // Log the error for troubleshooting
        }
    };
}

  