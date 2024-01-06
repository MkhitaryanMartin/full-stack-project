import { Dispatch } from "@reduxjs/toolkit";
import ProductService from "../../service/ProductService";
import { setUser } from "../../store/reducers/auth/authReducer";

export const createOnLike = (dispatch: Dispatch) => {
    return (id: number) => {
      ProductService.like(id)
        .then(res => {
          dispatch(setUser(res.data));
        })
        .catch(e => console.log(e));
    };
  };
   
   export const createOnCart = (dispatch: Dispatch) => {
   return (id: number)=>{
    ProductService.cart(id)
    .then(res => {
      dispatch(setUser(res.data))
    }) 
    .catch(e => console.log(e))
   }
   }