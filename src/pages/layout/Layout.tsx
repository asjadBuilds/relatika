import Header from "@/components/specific/Header"
import LeftSidebar from "@/components/specific/LeftSidebar"
import RightSidebar from "@/components/specific/RightSidebar"
import { useLoginStatus } from "@/context/LoginStatusContext"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Outlet } from "react-router-dom"
import { setUser } from "@/context/reducers/userSlice"
const Layout = () => {
    const {status} = useLoginStatus();
    const dispatch = useDispatch();
    const [collapse, setCollapse] = useState(false);
    useEffect(()=>{
        const userDetails = localStorage.getItem('userDetails');
        if(status || userDetails){
            if(userDetails) dispatch(setUser(JSON.parse(userDetails)));
        }
    }, [])
    const setCollapseHandler = () => {
        setCollapse(!collapse);
    }
    return (
        <div className="flex flex-col bg-neutral-900">
            <Header setCollapseHandler={setCollapseHandler}/>
            <div className="flex h-screen">
                <aside className={`${collapse ? 'w-0':'w-1/5'} transition-all duration-300 ease-in-out border-r border-solid border-neutral-400`}>
                <LeftSidebar/>
                </aside>
                <main className={`${collapse ? 'w-[80%]':'w-3/5'} max-h-[calc(100vh-66px)] overflow-y-scroll transition-all duration-300 ease-in-out`}>
                    <Outlet/>
                </main>
                <aside className="w-1/5 bg-white">
                <RightSidebar/>
                </aside>
            </div>
        </div>
    )
}

export default Layout