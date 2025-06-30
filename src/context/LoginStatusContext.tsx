import React, { ReactNode, useContext, useState } from 'react'
import { createContext } from 'react'

type LoginStatusContextType = {
  status: boolean;
  setLoginStatus: (value: boolean) => void;
};

const LoginStatusContext = createContext<LoginStatusContextType | undefined>(undefined);

export const useLoginStatus = () => {
  const context = useContext(LoginStatusContext);
  if (!context) {
    throw new Error('useLoginStatus must be used within a LoginStatusProvider');
  }
  return context;
};
type LoginStatusProviderProps = {
  children: ReactNode;
};
export const LoginStatusProvider:React.FC<LoginStatusProviderProps> = ({children})=>{
    const [status, setStatus] = useState<boolean>(false);
    const setLoginStatus = (value:boolean)=>{
        setStatus(value)
    }
    return(
        <LoginStatusContext.Provider value={{status,setLoginStatus}}>
            {children}
        </LoginStatusContext.Provider>
    )
}