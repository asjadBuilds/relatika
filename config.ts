

export const BASE_URL = 'https://relatika-backend.onrender.com'

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
    addComment: `${BASE_URL}/api/post/addComment`,
    createSpace: `${BASE_URL}/api/space/createSpace`,
    logoutUser: `${BASE_URL}/api/auth/logoutUser`,
    getPostsBySpaceId: `${BASE_URL}/api/post/getPostsBySpaceId`,
    getSpaceByQuery: `${BASE_URL}/api/space/getSpaceByQuery`,
    leaveSpace: `${BASE_URL}/api/space/leaveSpace`,
    getUserPosts: `${BASE_URL}/api/user/getUserPosts`,
    getUserComments: `${BASE_URL}/api/user/getUserComments`,
    getUserConversations: `${BASE_URL}/api/chat/getConversations`,
    getMessagesByConversation: `${BASE_URL}/api/chat/getMessages`,
    sendMessage: `${BASE_URL}/api/chat/sendMessage`,
    getSingleConversation: `${BASE_URL}/api/chat/getSingleConversation`
}