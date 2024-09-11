import { object, string } from "yup";
export const UsersShemasign =object({
    username:string().required().min(3).max(20),
    password:string().required(),
    email:string().email()
})

 export const UsersShemalogin =object({
    password:string().required(),
    email:string().email().required()
})
