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
import { useSelector } from 'react-redux';
import useSvg from '@/hooks/useSvg';
import { Link, useNavigate } from 'react-router-dom';
const Header = ({ setCollapseHandler }: { setCollapseHandler: () => void }) => {
    const userDetails = useSelector((state: any) => state.user.value);
    const svgUrl = useSvg(userDetails?.avatar);
    const navigate = useNavigate();
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
                <div className='absolute top-1/2 left-2 -translate-y-1/2 text-gray-500'>
                    <IoIosSearch size={30} />
                </div>
                <input type="text" className="p-2 bg-[#2a3236] hover:bg-neutral-700 transition-colors duration-150 rounded-full pl-10 placeholder:text-lg w-124" placeholder="Search..." />
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
                            <div className='flex items-center gap-1 hover:bg-neutral-700 p-3 rounded-full transition-colors duration-150 cursor-pointer' onClick={() => navigate('/create-post/new')}>
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
            </div>
        </div>
    )
}

export default Header