import { useQuery } from "@tanstack/react-query";
import { Input } from "../ui/input"
import { IoIosSearch } from "react-icons/io";
import { getCoversations } from "@/api/chatApi";
import { ImFilesEmpty } from "react-icons/im";
import moment from 'moment'
import { Separator } from "../ui/separator";
import { useChatBoxStatus } from "@/context/ChatBoxStatusContext";
import { useDispatch } from "react-redux";
import { setChatDetails } from "@/context/reducers/chatSlice";
const Inbox = () => {
    const { setChatStatus } = useChatBoxStatus();
    const dispatch = useDispatch();
    const { data: userConversations } = useQuery({
        queryKey: ['getConversations'],
        queryFn: getCoversations
    })
    const navigateToChat = (conversation: any) => {
        setChatStatus('chatbox');
        dispatch(setChatDetails(conversation))
        localStorage.setItem('chatDetails', JSON.stringify(conversation));
    }
    return (
        <div className=" flex flex-col text-white h-[calc(100vh-66px)]">
            <div className="relative m-2">
                <Input placeholder="Search Contacts" />
                <div className="absolute top-1 right-2">
                    <IoIosSearch size={30} />
                </div>
            </div>
            {userConversations && userConversations.length > 0 ?
                userConversations?.map((conversation: any) => (
                    <>
                        <Separator className="text-neutral-700" />
                        <div className="flex justify-between items-center p-2 rounded-md hover:bg-neutral-800 transition-colors duration-150 cursor-pointer" onClick={()=>navigateToChat(conversation)}>
                            <div className="flex items-center gap-1">
                                <div dangerouslySetInnerHTML={{ __html: conversation?.receiver?.avatar }} className="w-12"></div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-semibold">{conversation?.receiver?.username}</span>
                                    <p className="text-xs">{conversation?.lastMessage?.content}</p>
                                </div>
                            </div>
                            <span className="text-xs text-neutral-400">{moment(conversation?.lastMessage?.sentAt).format('hh:mm A')}</span>
                        </div>
                        <Separator className="text-neutral-700" />
                    </>
                )) :
                <div className="flex flex-col justify-center items-center gap-2 my-auto">
                    <div>
                        <ImFilesEmpty size={50} />
                    </div>
                    <h1 className="text-xl font-bold ">No Conversations Found</h1>
                </div>}
        </div>
    )
}

export default Inbox