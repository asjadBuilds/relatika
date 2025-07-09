import { FaRegCommentDots } from "react-icons/fa";
import moment from "moment";
import { Button } from "../ui/button";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addComment } from "@/api/postApi";
import { Textarea } from "@/components/ui/textarea"
import { useNavigate } from "react-router-dom";
const CommentItem = ({ comment, postId }: { comment: any, postId: any }) => {
    const [commentMsg, setCommentMsg] = useState('');
    const [replyInputId, setReplyInputId] = useState('');
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate: addCommentOnPost } = useMutation({
        mutationFn: addComment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['fetchComments'] })
            setCommentMsg('');
        }
    })
    return (
        <div className="flex flex-col justify-start gap-1 ml-4 mt-2">
            <div className="flex items-center gap-1">
                <div
                    dangerouslySetInnerHTML={{ __html: comment?.authorId?.avatar }}
                    className="w-8 rounded-full border border-white"
                ></div>
                <span onClick={()=>navigate(`/${comment?.authorId?.username}`,{state:{user:comment?.authorId}})} className="text-sm font-bold underline hover:text-blue-500 cursor-pointer">
                    {comment?.authorId?.username}
                </span>
                <span className="ml-1 text-xs text-neutral-400">
                    {moment(comment?.createdAt).fromNow()}
                </span>
            </div>

            <span className="text-sm ml-8">{comment?.content}</span>

            <div className="flex items-center gap-1 ml-8">
                <div className="flex item-center gap-1 rounded-full p-2 bg-neutral-800 hover:bg-neutral-700 transition-colors duration-200 mt-1" onClick={()=>setReplyInputId(comment._id)}>
                    <FaRegCommentDots />
                    <span className="text-xs">Reply</span>
                </div>
            </div>
            <div className={`relative transition-all duration-200 overflow-hidden ${replyInputId === comment._id ? 'max-h-[100px]':'max-h-0'}`}>
                <Textarea className="h-[100px]"/>
                <div className="absolute bottom-2 right-2 flex items-center gap-2">
                    <Button className="bg-blue-500 hover:bg-blue-600 !text-sm font-medium" onClick={() => addCommentOnPost({ content: commentMsg, postId, parentId: comment._id })}>Add Comment</Button>
                    <Button className="bg-white text-black !text-sm font-medium" onClick={()=>setReplyInputId('')}>Cancel</Button>
                </div>
            </div>

            {/* Render nested replies */}
            {comment.children && comment.children.length > 0 && (
                <div className="ml-4 border-l border-neutral-700 pl-2">
                    {comment.children.map((child: any, index: number) => (
                        <CommentItem key={child._id || index} comment={child} postId={postId} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CommentItem