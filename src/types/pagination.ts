import { Dispatch, SetStateAction } from "react";

export interface PaginationTypes {
   setPage: (value: number) => void,
   page: number
}