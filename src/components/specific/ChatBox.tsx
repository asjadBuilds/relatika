import { FaArrowLeft } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Input } from "../ui/input";
import { IoMdSend } from "react-icons/io";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMessagesByConversation, sendMessage } from "@/api/chatApi";
import { useSelector } from "react-redux";
import { useChatBoxStatus } from "@/context/ChatBoxStatusContext";
import socket from '../../../socket.ts'
import moment from "moment";
import { Message } from "@/models/types.ts";
const ChatBox = () => {
    const [msgInput, setMsgInput] = useState('');
    const { setChatStatus } = useChatBoxStatus();
    const queryClient = useQueryClient();
    const userDetails = useSelector((state: any) => state.user.value);
    const chatDetails = useSelector((state: any) => state.chat.value);
    const receiverDetails = chatDetails?.participants?.find(
        (participant: any) => participant._id !== userDetails._id
    );
    const { data: convMessages } = useQuery<Message[]>({
        queryKey: ['getMessagesByConversation'],
        queryFn: () => getMessagesByConversation(chatDetails?._id),
    })
    useEffect(() => {
        const handleReceiveMessage = (message: any) => {
            if (chatDetails?._id === message.conversation) {
                queryClient.setQueryData(['getMessagesByConversation'], (old: any) => {
                    return old ? [...old, message] : [message];
                });
            }
        };

        socket.on('receiveMessage', handleReceiveMessage);

        return () => {
            socket.off('receiveMessage', handleReceiveMessage);
        };
    }, [chatDetails?._id]);

    const { mutate: sendChatMessage } = useMutation({
        mutationFn: sendMessage,
        onSuccess: () => {
            setMsgInput('');
        }
    })
    const handleMessageSend = () => {
        if (msgInput.trim()) {
            sendChatMessage({
                sender: userDetails?._id,
                conversationId: chatDetails?._id,
                content: msgInput,
            })
        }
    }
    const navigateToInbox = () => {
        setChatStatus('inbox')
    }
    return (
        <div className="flex flex-col gap-3 text-white relative h-[calc(100vh-66px)] chat-background">
            <div className="flex justify-between items-center border-b border-b-white bg-neutral-800 p-2">
                <div className="flex items-center gap-1">
                    <div onClick={navigateToInbox}>
                        <FaArrowLeft />
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: receiverDetails?.avatar }} className="w-6">
                    </div>
                    <span>{receiverDetails?.username}</span>
                </div>
                <div>
                    <BsThreeDotsVertical />
                </div>
            </div>
            <div className="flex flex-col gap-4 w-full px-1">
                {convMessages?.map((message: any) => (
                    <div className={`flex flex-col gap-1 shadow-md relative w-[70%] rounded-xl p-2 ${message?.sender?._id === userDetails._id ? 'bg-blue-800 self-end' : 'bg-neutral-800 self-start'}`}>
                        <p className="text-sm">{message?.content}</p>
                        <span className="text-xs text-neutral-400 self-end">{moment(message?.sentAt).format('hh:mm A')}</span>
                    </div>
                ))}
            </div>
            <div className="absolute bottom-0 w-full bg-neutral-800">
                <div className="relative m-2">
                    <Input placeholder="Write here" value={msgInput} onChange={(e) => setMsgInput(e.target.value)} />
                    <div className="absolute top-1 right-2" onClick={handleMessageSend}>
                        <IoMdSend size={30} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatBox