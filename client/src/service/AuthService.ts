import $api from "../http";
import {AxiosResponse} from "axios"
import { AuthResponse } from "../models/respons/AuthResponse";

export default class AuthService{

    static async login(email: string, password: string):Promise<AxiosResponse<AuthResponse>>{
        return $api.post<AuthResponse>("/auth/login", {email, password})
    }
    static async registration(email: string, password: string, firstName: string, lastName:string, phone:number, photo: FileList):Promise<AxiosResponse<AuthResponse>>{
const formData =  new FormData()
formData.append('email', email);
  formData.append('password', password);
  formData.append('firstName', firstName);
  formData.append('lastName', lastName);
  formData.append('phone', phone.toString());
  formData.append('photo', photo[0]);

      return $api.post<AuthResponse>("/auth/registration", formData)
  }
    static async logout():Promise<void>{
        return $api.post("/auth/logout")
    }
}