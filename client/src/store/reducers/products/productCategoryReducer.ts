import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import { fetchProductCategory } from "./actionProducts";
import { ICategory} from "../../../models/IProducts";


interface InitialState {
    data: ICategory[];
    isLoading:boolean;
    error: string
}

const initialState: InitialState = {
    data : [],
    isLoading: false,
    error: "",

}


const productCategoryReducer = createSlice({
    name: "productCategory",
    initialState: initialState,
    reducers:{},
    extraReducers: (build)=>{
        build.addCase(fetchProductCategory.fulfilled, (state, action: PayloadAction<ICategory[]>)=>{
            state.isLoading = false;
            state.data = action.payload
        })

        build.addCase(fetchProductCategory.pending, (state)=>{
            state.isLoading = true
        })
        build.addCase(fetchProductCategory.rejected, (state, action:PayloadAction<any>)=>{
            state.isLoading = false;
            state.error = action.payload
        })
    }
})


export default productCategoryReducer.reducer