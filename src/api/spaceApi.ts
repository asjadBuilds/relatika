import { Space } from "@/models/types";
import axiosInstance from "../../axiosInstance";
import { CONFIG } from "../../config";

const getSpaces = (): Promise<Space[]> =>
  axiosInstance.get(CONFIG.getSpaces).then(res => res.data.data);

const joinSpace = (spaceId:any): Promise<any> => 
    axiosInstance.post(CONFIG.joinSpace, {spaceId}).then(res => res.data);

const leaveSpace = (spaceId:any): Promise<any> => 
    axiosInstance.post(CONFIG.leaveSpace, {spaceId}).then(res => res.data);

const getUserSpaces = (): Promise<Space[]> => 
  axiosInstance.post(CONFIG.getUserSpaces).then(res => res.data.data);

const getSpaceById = (spaceId:any): Promise<any> => 
  axiosInstance.post(CONFIG.getSpaceById, {spaceId}).then(res => res.data.data);

const createSpace = (formObj:any): Promise<any> => 
    axiosInstance.post(CONFIG.createSpace, formObj).then(res => res.data);

const getSpacesByQuery = (query:string): Promise<Space[]> => 
  axiosInstance.get(`${CONFIG.getSpaceByQuery}?name=${query}`).then((res)=>res.data.data)

export {
    getSpaces,
    joinSpace,
    getUserSpaces,
    getSpaceById,
    createSpace,
    getSpacesByQuery,
    leaveSpace
}