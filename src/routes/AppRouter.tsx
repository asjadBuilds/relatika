import Login from '@/pages/login/Login'
import Signup from '@/pages/signup/Signup'
import SelectSpace from '@/pages/select-space/SelectSpace'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '@/pages/layout/Layout'
import CreatePost from '@/pages/create-post/CreatePost'
import Feed from '@/pages/feed/Feed'
import PostDetails from '@/pages/post-details/PostDetails'

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
                    path: '/create-post/:spaceName',
                    element: <CreatePost />
                },
                {
                    path:'/details/:postId',
                    element: <PostDetails/>
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