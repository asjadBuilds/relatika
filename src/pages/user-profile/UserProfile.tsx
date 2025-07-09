import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "react-router-dom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getUserComments, getUserPosts } from "@/api/userApi";
import PostItem from "@/components/specific/PostItem";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";
const UserProfile = () => {
    const { state } = useLocation();
    const user = state?.user
    const { data: userPosts } = useQuery({
        queryKey: ['userPosts'],
        queryFn: getUserPosts
    })
    const { data: userComments } = useQuery({
        queryKey: ['userComments'],
        queryFn: getUserComments
    })
    return (
        <div className="flex flex-col text-white my-4 mx-8">
            <div className="flex items-center gap-4">
                <div dangerouslySetInnerHTML={{ __html: user?.avatar }} className="w-24 rounded-full border-2 border-white border-solid overflow-hidden"></div>
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold">Full Name</h1>
                    <span className="text-lg font-semibold text-neutral-300">{user?.username}</span>
                </div>
            </div>
            <div className="mt-8">
                <Tabs defaultValue="posts" className="w-full">
                    <TabsList>
                        <TabsTrigger value="posts">Posts</TabsTrigger>
                        <TabsTrigger value="comments">Comments</TabsTrigger>
                    </TabsList>
                    <TabsContent value="posts" asChild>
                        <div className="flex flex-col gap-1">
                            {userPosts?.map((post: any) => (
                                <PostItem post={post} />
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="comments" asChild>
                        <div className="flex flex-col">
                            {userComments?.map((commentItem: any) => (
                                <Link to={'/'}>
                                    <Separator className="bg-neutral-600"/>
                                <div className="flex justify-between items-center p-4 rounded-md group hover:bg-neutral-800 transition-colors duration-200">
                                    <div className="flex flex-col gap-1">
                                        <p> <span className="underline">{commentItem?.authorId?.username}</span> replying to {commentItem?.parentId?.authorId?.username || 'his own post'}</p>
                                        <p>{commentItem?.content}</p>
                                    </div>
                                    <div className="p-2 rounded-md bg-neutral-800 group-hover:bg-neutral-700">
                                        <FaArrowUpRightFromSquare />
                                    </div>
                                </div>
                                <Separator className="bg-neutral-600"/>
                                </Link>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default UserProfile