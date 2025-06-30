

export const BASE_URL = 'http://localhost:5000'

export const CONFIG = {
    createUser : `${BASE_URL}/api/auth/signUp`,
    refreshToken : `${BASE_URL}/api/auth/refreshToken`,
    loginUser: `${BASE_URL}/api/auth/signIn`,
    getSpaces: `${BASE_URL}/api/space/getSpaces`,
    joinSpace: `${BASE_URL}/api/space/joinSpace`,
    getUserSpaces: `${BASE_URL}/api/space/getUserSpaces`,
    createPost : `${BASE_URL}/api/post/new`,
    getPaginatedPosts: `${BASE_URL}/api/post/posts`,
    getSpaceById: `${BASE_URL}/api/space/getSpaceById`,
    addVote: `${BASE_URL}/api/post/addVote`,
    getCommentsByPost: `${BASE_URL}/api/post/getCommentsByPost`,
    addComment: `${BASE_URL}/api/post/addComment`
}