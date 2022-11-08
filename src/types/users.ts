export type Role = "admin" | "customer"

export interface User {
   id: number,
   email: string,
   password: string,
   role: Role,
   avatar: string,
   name: string
}

export interface UserReducer {
   users: User[],
   currentUser: User|undefined
}
export interface UserEncript {
   email:string,
   password: string
}