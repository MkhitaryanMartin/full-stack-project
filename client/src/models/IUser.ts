export interface IUserProduct{
    id: number,
    _id: number,
    cart:boolean, 
    like: boolean
}

export interface IUser{
    email: string;
    isActivated: boolean;
    id: string;
    products: IUserProduct[] | [];
    lastName: string;
    firstName: string;
    phone:string ;
    photo: string;
}