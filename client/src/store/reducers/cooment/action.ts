import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IAddComment } from "../../../models/IComment";

export const fetchComments = createAsyncThunk(
    "fetch/comments",
    async ({id}:{id:string}, thunkApi)=>{
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/comment/getComments?id=${id}` as string)
            const data = response.data;
            console.log(data)
            return data
        } catch (error) {
            return thunkApi.rejectWithValue((error as Error).message)
        }
    }
)

export const fetchAddComment = createAsyncThunk(
    "fetch/add/comment",
    async (comment:IAddComment, thunkApi)=>{
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/comment/addComment`, comment)
            const data = response.data;
            console.log(data, "hay")
            return data
        } catch (error) {
            return thunkApi.rejectWithValue((error as Error).message)
        }
    }
)
