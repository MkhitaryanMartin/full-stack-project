import $api from "../http";
import {AxiosResponse} from "axios"
import { AuthResponse } from "../models/respons/AuthResponse";
import { IUserProduct } from "../models/IUser";

export default class ProductService{

    static async like(id: number):Promise<AxiosResponse<IUserProduct[]>>{
        return $api.post<IUserProduct[]>("/shop/like", {id})
    }
    static async cart(id: number):Promise<AxiosResponse<IUserProduct[]>>{
        return $api.post<IUserProduct[]>("/shop/cart", {id})
    }
}