import { Post } from "@/models/types";
import axiosInstance from "../../axiosInstance";
import { CONFIG } from "../../config";

const getUserPosts = (): Promise<Post[]> => 
  axiosInstance.get(CONFIG.getUserPosts).then(res => res.data.data);

const getUserComments = (): Promise<Post[]> => 
  axiosInstance.get(CONFIG.getUserComments).then(res => res.data.data);

export {
    getUserPosts,
    getUserComments
}