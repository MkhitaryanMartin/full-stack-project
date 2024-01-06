import { configureStore, combineReducers } from "@reduxjs/toolkit";
import reducers from "./reducers"

const rootReducer = combineReducers(reducers)

const store = configureStore({
   reducer : rootReducer,
   devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store["dispatch"]

export default store;
