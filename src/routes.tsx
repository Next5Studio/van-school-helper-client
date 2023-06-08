import { createBrowserRouter } from 'react-router-dom'

import { Home } from '@pages/Home'
import { Login } from '@pages/Login'
import { Notification } from '@pages/Notification'
import { Join } from '@pages/Join'
import { Publish } from '@pages/Publish'
import { Moment } from '@pages/Moment'
import { Goods } from '@pages/Goods'
import { User } from 'react-feather'
import { Chat } from '@pages/Chat'

export default createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: 'login',
        element: <Login />
    },
    {
        path: 'notification',
        element: <Notification />
    },
    {
        path: 'join',
        element: <Join />
    },
    {
        path: 'publish',
        element: <Publish />
    },
    {
        path: 'moment',
        element: <Moment />
    },
    {
        path: 'goods',
        element: <Goods />
    },
    {
        path: 'user',
        element: <User />
    },
    {
        path: 'chat',
        element: <Chat />
    }
])
