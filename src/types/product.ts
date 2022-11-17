import { Category } from "./category";

export interface ProductType {
   id: number,
   title: string,
   price: number,
   description: string,
   category: Category,
   images: string[] | string
}
export interface EditType {
   id: number,
   title: string,
   price: number,
   
}
export interface ProductReducer {
   products: ProductType[],
   isLoading?: boolean
}