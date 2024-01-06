export interface IAuth {
    email: string;
    password: string;
}

export interface IRegister extends IAuth{
    phone:number;
    lastName: string;
    firstName: string;
    photo: FileList
}