import axiosInstance from "../../axiosInstance";
import { CONFIG } from "../../config";

const createUser = async (formObj:any):Promise<any>=>{
     const res = await axiosInstance.post(CONFIG.createUser, { ...formObj });
     return res.data;
}
const loginUser = async (formObj:any):Promise<any>=>{
     const res = await axiosInstance.post(CONFIG.loginUser, { ...formObj });
     return res.data;
}
const logout = async ():Promise<any>=>{
     const res = await axiosInstance.post(CONFIG.logoutUser);
     return res.data;
}
export {
     createUser,
     loginUser,
     logout
}