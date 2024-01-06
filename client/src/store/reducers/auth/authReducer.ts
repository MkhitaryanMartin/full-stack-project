import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { IUser, IUserProduct } from "../../../models/IUser";
import { fetchLogin, fetchLogout, fetchRegistration, fetchCheckAuth } from "./actionAuth";
import { AuthResponse } from "../../../models/respons/AuthResponse";

interface InitialState {
    user: IUser | null ;
    isAuth: boolean;
    error: string ;
    errorText: string;
    loader: boolean
}

const initialState: InitialState = {
    user : null,
    isAuth: false,
    error:"",
    errorText:"",
    loader:true
   
}

const authReducer = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setUser: (state, action:PayloadAction<IUserProduct[] | []>)=>{
            state.user = state?.user ? {...state.user, products: action.payload} : null
        },
        setLoader: (state, action: PayloadAction<boolean>)=>{
            state.loader = action.payload
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(fetchLogin.fulfilled, (state, action: PayloadAction<AuthResponse>)=>{
            state.isAuth = true;
            state.user = action.payload.user;
            state.loader = false;
        })
        builder.addCase(fetchLogin.pending, (state)=>{
            state.loader =true;
        })
        builder.addCase(fetchLogin.rejected, (state, action: PayloadAction<any>)=>{
            state.loader = false;
            state.error = action?.payload?.message;
            state.errorText = action?.payload?.response?.data?.message;
        })
        builder.addCase(fetchRegistration.fulfilled, (state, action: PayloadAction<AuthResponse>)=>{
            state.isAuth = true;
            state.user = action.payload.user;
            state.loader = false;
        })
        builder.addCase(fetchRegistration.pending, (state)=>{
            state.loader =true;
        })
        builder.addCase(fetchRegistration.rejected, (state, action: PayloadAction<any>)=>{
            state.loader = false;
            state.error = action?.payload?.message;
            state.errorText = action?.payload?.response?.data?.message;
        })
        builder.addCase(fetchLogout.fulfilled, (state)=>{
            state.isAuth = false;
            state.user = null;
            state.loader = false;
        })
        builder.addCase(fetchLogout.pending, (state)=>{
            state.loader =true;
        })
        builder.addCase(fetchLogout.rejected, (state, action: PayloadAction<any>)=>{
            state.loader = false;
            state.error = action.payload;
        })
        builder.addCase(fetchCheckAuth.fulfilled, (state, action: PayloadAction<AuthResponse>)=>{
            state.isAuth = true;
            state.user = action.payload?.user;
            state.loader = false
        })
        builder.addCase(fetchCheckAuth.pending, (state)=>{
            state.loader =true;
        })
        builder.addCase(fetchCheckAuth.rejected, (state, action: PayloadAction<any>)=>{
            state.loader = false;
            state.error = action.payload;
        })
        
    }

})

export default authReducer.reducer;
export const {setUser, setLoader} = authReducer.actions