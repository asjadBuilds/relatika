import { useLocation, useNavigate } from "react-router-dom";
import {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
    TooltipProvider
} from '@radix-ui/react-tooltip';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { GoPlus } from "react-icons/go";
import { IoIosNotifications } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchSpacePosts } from "@/api/postApi";
import { Post } from "@/models/types";
import PostItem from "@/components/specific/PostItem";
import { DialogClose } from "@radix-ui/react-dialog";
import { getSpaceById, joinSpace, leaveSpace } from "@/api/spaceApi";
import { toast } from "sonner";
const SpaceFront = () => {
    const { state } = useLocation();
    const spaceDetails = state?.space;
    const navigate = useNavigate();
    const loadMoreRef = useRef<HTMLDivElement>(null);
    const queryClient = useQueryClient();
    const location = useLocation();
    const {
        data: postData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['posts'],
        initialPageParam: null,
        queryFn: ({ pageParam }) => fetchSpacePosts(pageParam, spaceDetails?._id),
        getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

    const {data:space} = useQuery({
        queryKey:['getSpaceById'],
        queryFn: () => getSpaceById(spaceDetails?._id)
    })

    const {mutate: leaveSpaceById} = useMutation({
        mutationFn: leaveSpace,
        onSuccess:(response)=>{
            toast.success(response?.message)
            queryClient.invalidateQueries({queryKey:['getSpaceById']})
        }
    })

    const {mutate: joinSpaceById} = useMutation({
        mutationFn: joinSpace,
        onSuccess:(response)=>{
            toast.success(response?.message);
            queryClient.invalidateQueries({queryKey:['getSpaceById']})
        }
    })

    useEffect(() => {
        queryClient.invalidateQueries({ queryKey: ['posts'] });
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 1.0 }
        );

        if (loadMoreRef.current) observer.observe(loadMoreRef.current);

        return () => {
            if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
        };
    }, [fetchNextPage, hasNextPage, location.pathname])
    return (
        <div className="flex flex-col gap-1 text-white m-3">
            <div className="flex flex-col">
                <div className="bg-neutral-700 w-full h-28 rounded-md"></div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 ml-4">
                        <div className="rounded-full border-2 border-white -mt-10">
                            <img src={space?.avatar} alt="" className="w-24" />
                        </div>
                        <h1 className="text-3xl font-bold">{space?.name}</h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className='flex items-center gap-1 hover:bg-neutral-700 p-3 rounded-full transition-colors duration-150 cursor-pointer' onClick={() => navigate(`/create-post/new/${space?.name}`)}>
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
                        {space?.isMember ? <>
                        <Dialog>
                            <DialogTrigger>
                                <Button className={`${space?.isMember ? 'bg-white text-black' : 'bg-blue-500 hover:bg-blue-600'}`}>{space?.isMember ? 'Joined' : 'Join'}</Button>
                            </DialogTrigger>
                            <DialogContent className="shadow-2xl bg-neutral-800">
                                <DialogHeader className="text-center">
                                    <DialogTitle className="text-white text-2xl font-bold">You want to leave</DialogTitle>
                                    <DialogDescription className="text-sm font-medium">
                                        You will not be able to interact with the space after this action
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button onClick={()=> leaveSpaceById(space?._id)} className="bg-blue-500 text-white">Leave</Button>
                                    </DialogClose>
                                    <DialogClose asChild>
                                        <Button>Cancel</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        </> : 
                        <>
                        <Button onClick={()=> joinSpaceById(space?._id)} className={`${space?.isMember ? 'bg-white text-black' : 'bg-blue-500 hover:bg-blue-600'}`}>{space?.isMember ? 'Joined' : 'Join'}</Button>
                        </>}
                        
                        
                    </div>
                </div>
            </div>
            <div className="text-white flex flex-col">
                {postData?.pages?.map((page: any, index: any) => (
                    <div key={index}>
                        {page?.enrichedPosts?.map((post: Post, index: any) => (
                            <PostItem post={post} key={index} />
                        ))}
                    </div>
                ))}
                <div ref={loadMoreRef}>
                    {isFetchingNextPage && <p>Loading more...</p>}
                </div>
            </div>
        </div>
    )
}

export default SpaceFront