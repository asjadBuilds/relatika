import {  fetchPaginatedPosts } from "@/api/postApi";
import PostItem from "@/components/specific/PostItem";
import { Post } from "@/models/types";
import { useInfiniteQuery } from "@tanstack/react-query";

import { useEffect, useRef } from "react";

const Feed = () => {
    const loadMoreRef = useRef<HTMLDivElement>(null);
    
    const {
        data: postData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['posts'],
        initialPageParam: null,
        queryFn: ({ pageParam }) => fetchPaginatedPosts(pageParam),
        getNextPageParam: (lastPage) => lastPage.nextCursor,
    });
    
   
    useEffect(() => {
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
    }, [fetchNextPage, hasNextPage])
    
    return (
        <div className="text-white flex flex-col">
            {postData?.pages?.map((page: any, index: any) => (
                <div key={index}>
                    {page?.enrichedPosts?.map((post:Post, index:any) => (
                        <PostItem post={post} key={index}/>
                    ))}
                </div>
            ))}
            <div ref={loadMoreRef}>
                {isFetchingNextPage && <p>Loading more...</p>}
            </div>
        </div>
    )
}

export default Feed