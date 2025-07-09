import axiosInstance from "../../axiosInstance";
import { BASE_URL, CONFIG } from "../../config";

const createPost = async (formObj:any):Promise<any>=>{
     const res = await axiosInstance.post(CONFIG.createPost, formObj);
     return res.data;
}

const fetchPaginatedPosts = async ( pageParam : any) => {
  const limit = 5;
  const url = pageParam
    ? `${BASE_URL}/api/post/posts?limit=${limit}&cursor=${pageParam}`
    : `${BASE_URL}/api/post/posts?limit=${limit}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
};

const fetchSpacePosts = async ( pageParam : any, spaceId:any) => {
  const limit = 5;
  const url = pageParam
    ? `${BASE_URL}/api/post/getPostsBySpaceId/${spaceId}?limit=${limit}&cursor=${pageParam}`
    : `${BASE_URL}/api/post/getPostsBySpaceId/${spaceId}?limit=${limit}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
};

const addVote = async({ value, postId }: { value: number; postId: string })=>{
  const res = await axiosInstance.post(`${CONFIG.addVote}/${postId}`,{value});
     return res.data;
}
const getCommentsByPost = async(postId:string)=>{
  const res = await axiosInstance.post(`${CONFIG.getCommentsByPost}/${postId}`);
     return res.data;
}
const addComment = async({content,postId,parentId}:{content:string,postId:string,parentId:string})=>{
  const res = await axiosInstance.post(`${CONFIG.addComment}`,{content, postId, parentId});
     return res.data;
}

export {
    createPost,
    fetchPaginatedPosts,
    addVote,
    getCommentsByPost,
    addComment,
    fetchSpacePosts
}