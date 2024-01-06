import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../../service/AuthService";
import { IAuth, IRegister } from "../../../models/IAuth";
import axios from "axios";
import { AuthResponse } from "../../../models/respons/AuthResponse";

export const fetchLogin = createAsyncThunk(
    "fetchLogin",
    async ({email, password}: IAuth, thunkApi)=>{
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem("token", response.data.accesToken);
            return response.data
        } catch (e) {
            return thunkApi.rejectWithValue((e as Error))
        }
    }
)

export const fetchRegistration  = createAsyncThunk(
    "fetchRegistration",
    async ({email, password, lastName, firstName, phone, photo}: IRegister, thunkApi)=>{
        try {
            const response = await AuthService.registration(email, password, lastName, firstName, phone, photo);
            localStorage.setItem("token", response.data.accesToken);
            return response.data
        } catch (e) {
          return thunkApi.rejectWithValue((e as Error))
        }
    }
)


export const fetchLogout = createAsyncThunk(
    "fetchLogout",
    async (_, thunkApi)=>{
        try {
             await AuthService.logout();
            localStorage.removeItem("token");
            return null
        } catch (e) { 
          return thunkApi.rejectWithValue((e as Error).message)
        }
    }
)

export const fetchCheckAuth = createAsyncThunk(
    "fetchCheckAuth",
    async (_, thunkApi)=> {
        try {
            const response = await axios.get<AuthResponse>(`${process.env.REACT_APP_API_URL}/auth/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accesToken);
           return response.data
        } catch (e) {
           return thunkApi.rejectWithValue((e as Error).message)
        }
    }
)