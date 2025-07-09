import relatikaLogo from '../../assets/relatika-abstract-logo.png';
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { IoIosNotifications } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { LuListCollapse } from "react-icons/lu";
import {
    Avatar,
    AvatarImage,
    AvatarFallback,
} from '@radix-ui/react-avatar';
import {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
    TooltipProvider
} from '@radix-ui/react-tooltip';
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { useDispatch, useSelector } from 'react-redux';
import useSvg from '@/hooks/useSvg';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { useMutation } from '@tanstack/react-query';
import { logout } from '@/api/authApi';
import { toast } from 'sonner';
import { useLoginStatus } from '@/context/LoginStatusContext';
import { setUser } from '@/context/reducers/userSlice';
import { ChangeEvent, useState } from 'react';
const Header = ({ setCollapseHandler }: { setCollapseHandler: () => void }) => {
    const userDetails = useSelector((state: any) => state.user.value);
    const [search, setSearch] = useState('');
    const svgUrl = useSvg(userDetails?.avatar);
    const { setLoginStatus } = useLoginStatus();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { mutate } = useMutation({
        mutationFn: logout,
        onSuccess: (response) => {
            setLoginStatus(false);
            dispatch(setUser({}));
            toast.success(response.message);
            navigate('/login')
        }
    })
    const handleSearch = () => {
        if (search.trim()) {
            navigate(`/spaces?search=${encodeURIComponent(search)}`);
        }
    }
    return (
        <div className="flex items-center justify-between w-full text-white p-2 border-b border-solid border-neutral-400 sticky top-0 bg-neutral-900">
            <div className="flex items-center gap-1">
                <div className='hover:bg-neutral-700 p-3 rounded-full transition-colors duration-150 cursor-pointer' onClick={setCollapseHandler}>
                    <LuListCollapse size={25} />
                </div>
                <Link to={'/'}>
                    <img src={relatikaLogo} alt="relatika" className='w-12' />
                </Link>
                <h2 className='text-3xl font-semibold'>Relatika</h2>
            </div>
            <div className='relative'>
                <div onClick={handleSearch} className='absolute top-1/2 left-2 -translate-y-1/2 text-gray-500'>
                    <IoIosSearch size={30} />
                </div>
                <input
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch();
                        }
                    }}
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="p-2 bg-[#2a3236] hover:bg-neutral-700 transition-colors duration-150 rounded-full pl-10 placeholder:text-lg w-124" placeholder="Search..." />
            </div>
            <div className='flex items-center gap-1'>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className='hover:bg-neutral-700 p-3 rounded-full transition-colors duration-150 cursor-pointer'>
                                <IoChatbubbleEllipsesOutline size={25} />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <span className='bg-white text-black text-sm font-medium p-2 rounded-md'>Chat</span>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className='flex items-center gap-1 hover:bg-neutral-700 p-3 rounded-full transition-colors duration-150 cursor-pointer' onClick={() => navigate('/create-post/new/0')}>
                                <GoPlus size={25} />
                                <span className='text-sm'>Create</span>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <span className='bg-white text-black text-sm font-medium p-2 rounded-md'>Create Post</span>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className='hover:bg-neutral-700 p-3 rounded-full transition-colors duration-150 cursor-pointer'>
                                <IoIosNotifications size={25} />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <span className='bg-white text-black text-sm font-medium p-2 rounded-md'>Notifications</span>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <Menubar>
                    <MenubarMenu>
                        <MenubarTrigger>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div>
                                            <Avatar>
                                                <AvatarImage src={svgUrl} alt="User Avatar" className='w-12 rounded-full' />
                                                <AvatarFallback>U</AvatarFallback>
                                            </Avatar>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <span className='bg-white text-black text-sm font-medium p-2 rounded-md'>User Profile</span>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </MenubarTrigger>
                        <MenubarContent className='bg-neutral-900 text-white *:p-2'>
                            <MenubarItem asChild>
                                <div className='flex flex-col items-start'>
                                    <div className='flex items-center gap-1'>
                                        <Avatar>
                                            <AvatarImage src={svgUrl} alt="User Avatar" className='w-12 rounded-full' />
                                            <AvatarFallback>U</AvatarFallback>
                                        </Avatar>
                                        <h2 className='text-sm font-semibold'>{userDetails?.username}</h2>
                                    </div>
                                    <Button className='w-full bg-blue-500' onClick={()=>navigate(`/${userDetails?.username}`,{state:{user:userDetails}})}>See Profile</Button>
                                </div>
                            </MenubarItem>
                            <MenubarItem className='text-sm font-semibold'>
                                Settings
                            </MenubarItem>
                            <MenubarSeparator className='!p-0 bg-neutral-600' />
                            <MenubarItem asChild>
                                <Button className='w-full bg-blue-500 mt-2' onClick={() => mutate()}>Logout</Button>
                            </MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>
            </div>
        </div>
    )
}

export default Header