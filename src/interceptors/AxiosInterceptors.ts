import React, { ReactNode, useEffect } from "react";
import axiosInstance from "../../axiosInstance";
import { useLoginStatus } from "../context/LoginStatusContext";
import { CONFIG } from "../../config";

type AxiosInterceptorProps = {
  children:ReactNode
}

const AxiosInterceptor:React.FC<AxiosInterceptorProps> = ({ children }) => {
  // const navigate = useNavigate();
  const {setLoginStatus} = useLoginStatus()

  useEffect(() => {
    const resInterceptor = (response:any) => response;

    const errInterceptor = (error:any) => {
      console.log(error)
      if (error.response?.status === 401) {
        setLoginStatus(false);
        localStorage.removeItem("accessToken");
        getRefreshToken()
      }
      return Promise.reject(error);
    };

    const interceptor = axiosInstance.interceptors.response.use(resInterceptor, errInterceptor);

    return () => {
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, []);

  const getRefreshToken = async()=>{
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
       const {data} = await axiosInstance.post(CONFIG.refreshToken)
       if(data.success){
        localStorage.setItem("accessToken", data?.data.accessToken);
        localStorage.setItem("refreshToken", data?.data.refreshToken);
      }
      }
    } catch (error) {
      
    }
  }

  return children;
};

export default AxiosInterceptor;
