export interface ICategory {
    id: number;
    name: string;
    image: string;
    creationAt: Date;
    updatedAt: Date
}


export interface IProduct {
    _id: string;
    title: string;
    price: number;
    description: string;
    images: string[];
    category: ICategory;
    creationAt: Date;
    updatedAt: Date;
    id: number;
    like?: number
}