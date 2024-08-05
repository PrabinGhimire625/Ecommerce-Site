import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "./store";
import { RootState } from "@reduxjs/toolkit/query";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector:TypedUseSelectorHook<RootState>=useSelector