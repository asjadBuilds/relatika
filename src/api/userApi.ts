import { Post } from "@/models/types";
import axiosInstance from "../../axiosInstance";
import { CONFIG } from "../../config";

const getUserPosts = (userId:string): Promise<Post[]> => 
  axiosInstance.post(CONFIG.getUserPosts,{userId}).then(res => res.data.data);

const getUserComments = (userId:string): Promise<Post[]> => 
  axiosInstance.post(CONFIG.getUserComments,{userId}).then(res => res.data.data);

export {
    getUserPosts,
    getUserComments
}