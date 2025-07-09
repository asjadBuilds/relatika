import { useEffect } from "react";
import ChatBox from "./ChatBox"
import Inbox from "./Inbox"
import { useChatBoxStatus } from "@/context/ChatBoxStatusContext";
import { useDispatch } from "react-redux";
import { setChatDetails } from "@/context/reducers/chatSlice";
const RightSidebar = () => {
  const {status, setChatStatus} = useChatBoxStatus();
  const dispatch = useDispatch();
  useEffect(() => {
    const savedView = localStorage.getItem("sidebarView");
    if (savedView === "chatbox" || savedView === "inbox") {
      setChatStatus(savedView);
    }
    const chatDetailsStr = localStorage.getItem('chatDetails');
    const chatDetails = chatDetailsStr ? JSON.parse(chatDetailsStr) : null
    dispatch(setChatDetails(chatDetails))
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebarView", status);
    
  }, [status]);

  return (
    <div className="bg-neutral-900 border-l border-neutral-400">
      {status === 'inbox' ?
       <Inbox/> : <ChatBox/>}
    </div>
  )
}

export default RightSidebar