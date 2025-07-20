import { useLocation } from "react-router-dom";
import { TiArrowUpOutline } from "react-icons/ti";
import { TiArrowDownOutline } from "react-icons/ti";
import { HiOutlineSave } from "react-icons/hi";
import { FaRegCommentDots } from "react-icons/fa";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Separator } from "@/components/ui/separator";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSpaceById } from "@/api/spaceApi";
import moment from "moment";
import { addComment, addVote, getCommentsByPost } from "@/api/postApi";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CommentItem from "@/components/specific/CommentItem";
const PostDetails = () => {
    const { state } = useLocation();
    const post = state?.post;
    const queryClient = useQueryClient();
    const [commentMsg, setCommentMsg] = useState('');
    const {
        mutate,
        data
    } = useMutation({
        mutationFn: getSpaceById,
    })
    const { mutate: voteMutate } = useMutation({
        mutationKey: ['addVote'],
        mutationFn: addVote,
    })
    const { data: postComments } = useQuery({
        queryKey: ['fetchComments'],
        queryFn: ()=>getCommentsByPost(post._id)
    })
    console.log(postComments)
    const { mutate: addCommentOnPost } = useMutation({
        mutationFn: addComment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['fetchComments'] })
            setCommentMsg('');
        }
    })
    const addVoteHandler = ({ value, postId }: any) => {
        voteMutate({ value, postId })
        queryClient.invalidateQueries({ queryKey: ['posts'] })
    }
    return (
        <div className="flex flex-col text-white">
            <div className="flex flex-col justify-start gap-3 p-2 m-2 rounded-lg hover:bg-neutral-800 transition-colors duration-200">
                <div className="flex items-center gap-1">
                    <img src={post?.spaceId?.avatar} alt="" className="w-6" />
                    <div className="flex flex-col">
                        <HoverCard>
                            <HoverCardTrigger onMouseEnter={() => mutate(post?.spaceId?._id)}>
                                <span className="text-xs font-medium hover:text-blue-500 hover:underline">{post?.spaceId?.name}</span>
                            </HoverCardTrigger>
                            <HoverCardContent asChild className="bg-neutral-900 border-none shadow-xl">
                                <div className="flex flex-col justify-start gap-2">
                                    <div className="flex items-center gap-1">
                                        <img src={post?.spaceId?.avatar} alt="" className="w-6" />
                                        <h2 className="text-base font-bold underline text-white">{post?.spaceId?.name}</h2>
                                    </div>
                                    <p className="text-xs text-neutral-400">{post?.spaceId?.description}</p>
                                    <Separator className="bg-neutral-600" />
                                    <div className="flex flex-col gap-1 text-sm">
                                        <span className="font-bold text-white">{data?.membersCount}</span>
                                        <span className="text-neutral-400">Members</span>
                                    </div>
                                </div>
                            </HoverCardContent>
                        </HoverCard>
                        <HoverCard>
                            <HoverCardTrigger className="-mt-2">
                                <span className="text-xs hover:text-blue-500 hover:underline">{post?.author?.username}</span>
                            </HoverCardTrigger>
                            <HoverCardContent asChild className="bg-neutral-900 border-none shadow-xl">
                                <div className="flex flex-col justify-start gap-1">
                                    <div className="flex items-center gap-1">
                                        <div dangerouslySetInnerHTML={{ __html: post?.author?.avatar }} className="w-6"></div>
                                        <h2 className="text-white text-base underline font-bold">{post?.author?.username}</h2>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="text-white">Bio:</span>
                                        <p className="text-neutral-400 text-xs">{post?.author?.bio || '---'}</p>
                                    </div>
                                    <Separator className="bg-neutral-600" />
                                    <span className="text-sm font-medium text-white">Member since {moment(post?.author?.createdAt).format("MMM D, YYYY")}</span>
                                </div>
                            </HoverCardContent>
                        </HoverCard>
                    </div>
                    <span className="text-xs text-neutral-400 ml-2 -mt-3">{moment(post?.createdAt).fromNow()}</span>
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-2">{post?.title}</h2>
                    <div dangerouslySetInnerHTML={{ __html: post?.content }}>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex item-center bg-neutral-700 rounded-full">
                        <div className="flex items-center p-2 rounded-full hover:text-blue-500 transition-colors duration-200" onClick={() => addVoteHandler({ value: 1, postId: post._id })}>
                            <TiArrowUpOutline />
                            {post?.upvoteCount || ''}
                        </div>
                        <div className="flex items-center p-2 rounded-full hover:text-red-500 transition-colors duration-200" onClick={() => addVoteHandler({ value: -1, postId: post._id })}>
                            <TiArrowDownOutline />
                            {post?.downvoteCount || ''}
                        </div>
                    </div>
                    <div className="flex items-center p-2 rounded-full bg-neutral-700 hover:bg-neutral-600 transition-colors duration-200">
                        <FaRegCommentDots />
                        {post?.commentCount || ''}
                    </div>
                    <div className="p-2 rounded-full bg-neutral-700 hover:bg-neutral-600 transition-colors duration-200">
                        <HiOutlineSave />
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-2 justify-center">
                <Input className="w-[80%]" onChange={(e) => setCommentMsg(e.target.value)} />
                <Button className="bg-blue-500 hover:bg-blue-600 font-medium" onClick={() => addCommentOnPost({ content: commentMsg, postId: post?._id, parentId: '' })}>Add Comment</Button>
            </div>
            <div className="mt-3 p-3">
                <h2 className="text-lg font-semibold">Comments</h2>
                {postComments?.data?.map((comment: any, index: any) => (
                    <CommentItem comment={comment} key={index} postId={comment?.postId}/>
                ))}
            </div>
        </div>
    )
}

export default PostDetails