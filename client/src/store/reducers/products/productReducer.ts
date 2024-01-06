import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import { fetchProduct } from "./actionProducts";
import { IProduct } from "../../../models/IProducts";


interface InitialState {
    data: IProduct | null;
    isLoading:boolean;
    error: string;
    activeProduct: number | null
}

const initialState: InitialState = {
    data : null,
    isLoading: false,
    error: "",
    activeProduct: null

}


const productReducer = createSlice({
    name: "product",
    initialState: initialState,
    reducers:{
        setActiveProduct: (state, action)=>{
            console.log(action.payload)
            state.activeProduct = action.payload
        }
    },
    extraReducers: (build)=>{
        build.addCase(fetchProduct.fulfilled, (state, action: PayloadAction<IProduct>)=>{
            state.isLoading = false;
            state.data = action.payload
        })

        build.addCase(fetchProduct.pending, (state)=>{
            state.isLoading = true
        })
        build.addCase(fetchProduct.rejected, (state, action:PayloadAction<any>)=>{
            state.isLoading = false;
            state.error = action.payload
        })
    }
})


export const {setActiveProduct} = productReducer.actions
export default productReducer.reducer