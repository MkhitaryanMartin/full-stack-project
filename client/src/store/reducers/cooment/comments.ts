import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import { fetchComments, fetchAddComment } from "./action";
import { IComment } from "../../../models/IComment";
import { count } from "console";


interface InitialState {
    data: IComment[];
    count:  number;
    isLoading:boolean;
    error: string;
}

interface Action {
    results :{
        items: IComment[];
        count: number
    }
}


const initialState: InitialState = {
    data : [],
    count: 0,
    isLoading: false,
    error: "",
}


const comments = createSlice({
    name: "comments",
    initialState: initialState,
    reducers:{},
    extraReducers: (build)=>{
        build.addCase(fetchComments.fulfilled, (state, action: PayloadAction<Action>)=>{
            state.isLoading = false;
            state.data = action.payload.results.items;
            state.count = action.payload.results.count;
        })

        build.addCase(fetchComments.pending, (state)=>{
            state.isLoading = true
        })
        build.addCase(fetchComments.rejected, (state, action:PayloadAction<any>)=>{
            state.isLoading = false;
            state.error = action.payload
        })
        build.addCase(fetchAddComment.fulfilled, (state, action: PayloadAction<IComment>)=>{
            state.isLoading = false;
            state.data = [...state.data, action.payload];
            state.count =state.count + 1
        })

        build.addCase(fetchAddComment.pending, (state)=>{
            state.isLoading = true
        })
        build.addCase(fetchAddComment.rejected, (state, action:PayloadAction<any>)=>{
            state.isLoading = false;
            state.error = action.payload
        })
        
    }
})

export default comments.reducer