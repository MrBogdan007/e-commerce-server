import { ProductType } from "./product";

export interface ModalInt{
   signIn?: boolean,
   setSignIn?: (value: boolean) => void ,
   item?: ProductType
}