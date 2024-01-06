import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import { fetchProducts } from "./actionProducts";
import { IProduct } from "../../../models/IProducts";


interface InitialState {
    data: IProduct[];
    totalCount:  number;
    isLoading:boolean;
    error: string;
    page: number;
    category: string;
    sort:string;
    search:string
}

type Action = {
    products: IProduct[];
    totalCount:  number;
}
const initialState: InitialState = {
    data : [],
    totalCount: 0,
    isLoading: false,
    error: "",
    page: 0,
    category:"all",
    sort:"1",
    search:""
}


const productsReducer = createSlice({
    name: "products",
    initialState: initialState,
    reducers:{
        setCategory: (state, action: PayloadAction<string>)=>{
            state.page = 0;
            state.category = action.payload
        },
        setPage:(state, action)=>{
            state.page = action.payload
        },
        setSort:(state, action)=>{
            state.sort = action.payload
        },
        setSearch:(state, action)=>{
            state.page = 0;
            state.search= action.payload
        },
        resetFilter:(state)=>{
            state.category = "all";
            state.search= "";
            state.sort = "1"
        }
    },
    extraReducers: (build)=>{
        build.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Action>)=>{
            state.isLoading = false;
            state.data = action.payload.products;
            state.totalCount = action.payload.totalCount;
        })

        build.addCase(fetchProducts.pending, (state)=>{
            state.isLoading = true
        })
        build.addCase(fetchProducts.rejected, (state, action:PayloadAction<any>)=>{
            state.isLoading = false;
            state.error = action.payload
        })
    }
})

export const {setCategory, setPage, setSort, setSearch, resetFilter} = productsReducer.actions;
export default productsReducer.reducer