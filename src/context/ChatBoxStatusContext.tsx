import React, { ReactNode, useContext, useState } from 'react'
import { createContext } from 'react'

type ChatStatusContextType = {
  status: string;
  setChatStatus: (value: string) => void;
};

const ChatBoxStatusContext = createContext<ChatStatusContextType | undefined>(undefined);

export const useChatBoxStatus = () => {
  const context = useContext(ChatBoxStatusContext);
  if (!context) {
    throw new Error('useLoginStatus must be used within a LoginStatusProvider');
  }
  return context;
};
type ChatBoxStatusProviderProps = {
  children: ReactNode;
};
export const ChatStatusProvider:React.FC<ChatBoxStatusProviderProps> = ({children})=>{
    const [status, setStatus] = useState<string>('inbox');
    const setChatStatus = (value:string)=>{
        setStatus(value)
    }
    return(
        <ChatBoxStatusContext.Provider value={{status,setChatStatus}}>
            {children}
        </ChatBoxStatusContext.Provider>
    )
}