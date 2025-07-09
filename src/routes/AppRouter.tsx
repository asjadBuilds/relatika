import Login from '@/pages/login/Login'
import Signup from '@/pages/signup/Signup'
import SelectSpace from '@/pages/select-space/SelectSpace'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '@/pages/layout/Layout'
import CreatePost from '@/pages/create-post/CreatePost'
import Feed from '@/pages/feed/Feed'
import PostDetails from '@/pages/post-details/PostDetails'
import CreateSpace from '@/pages/create-space/CreateSpace'
import SpaceFront from '@/pages/space-front/SpaceFront'
import SpaceListing from '@/pages/space-listing/SpaceListing'
import UserProfile from '@/pages/user-profile/UserProfile'

const AppRouter = () => {

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout />,
            children: [
                {
                    path:'',
                    element:<Feed/>
                },
                {
                    path: '/create-post/new/:spaceName',
                    element: <CreatePost />
                },
                {
                    path:'/details/:postId',
                    element: <PostDetails/>
                },
                {
                    path:'/space/new/:id',
                    element:<CreateSpace/>
                },
                {
                    path:'/space/:id',
                    element:<SpaceFront/>
                },
                {
                    path:'/space/:id/details/:postId',
                    element:<PostDetails/>
                },
                {
                    path:'/spaces',
                    element:<SpaceListing/>
                },
                {
                    path:'/:username',
                    element:<UserProfile/>
                }
            ]
        },
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/signup',
            element: <Signup />
        },
        {
            path: '/select-space',
            element: <SelectSpace />
        },

    ])
    return <RouterProvider router={router} />
}

export default AppRouter