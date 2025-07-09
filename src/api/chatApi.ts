import { Message, SendMessageParams } from "@/models/types";
import axiosInstance from "../../axiosInstance";
import { CONFIG } from "../../config";
import socket from '../../socket.ts'
const getCoversations = (): Promise<any> =>
  axiosInstance.get(CONFIG.getUserConversations).then(res => res.data.data);

const getMessagesByConversation = (conversationId:string): Promise<Message[]> => {
  socket.emit('joinRoom', conversationId);
  return axiosInstance.get(`${CONFIG.getMessagesByConversation}/${conversationId}`).then(res => res.data.data);
}

const getSingleConversation = (receiverId:string): Promise<any> =>
  axiosInstance.post(CONFIG.getSingleConversation,{receiverId}).then(res => res.data.data);

const sendMessage = ({sender,conversationId,content}:SendMessageParams): Promise<any> =>
  axiosInstance.post(CONFIG.sendMessage,{sender, conversationId, content}).then(res => res.data.data);

export {
  getCoversations,
  getSingleConversation,
  sendMessage,
  getMessagesByConversation
}