import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
    "fetchProducts",
    async ({limit="10", sort="", category="", page, search=""}:{limit?:string, sort?:string, category?:string, page?: number, search?:string}, thunkApi)=>{
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/shop/products?skip=${page}&limit=${limit}&sort=${sort}&category=${category}&search=${search}` as string)
            const data = response.data;
            return data
        } catch (error) {
            return thunkApi.rejectWithValue((error as Error).message)
        }
    }
)

export const fetchProductCategory = createAsyncThunk(
    "fetchProductCategory",
    async (_, thunkApi)=>{
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/shop/products/category` as string)
            const data = response.data;
            return data
        } catch (error) {
            return thunkApi.rejectWithValue((error as Error).message)
        }
    }

)

export const fetchProduct = createAsyncThunk(
    "fetchProduct",
    async (id:number, thunkApi)=>{
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/shop/product`,{id})
            return response.data
        } catch (error) {
           return thunkApi.rejectWithValue((error as Error).message)
        }
    }
)