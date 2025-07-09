export type Space = {
    name:String,
    _id:String,
    description:String,
    rules:any,
    spaceId:any
    createdAt:String,
    updatedAt:String,
    __v:Number,
    avatar:any,
}
export type Post = {
    _id:String
    title:String,
    content:String,
    images:any,
    spaceId:any,
    author:any,
    upvoteCount:number,
    downvoteCount:number,
    commentCount:number,
    createdAt:any,
    updatedAt:String,
    __v:Number,
}