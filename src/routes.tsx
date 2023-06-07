import { createBrowserRouter } from 'react-router-dom'

import { Home } from '@pages/Home'
import { Login } from '@pages/Login'
import { Notification } from '@pages/Notification'
import { Join } from '@pages/Join'
import { Publish } from '@pages/Publish'
import { Moment } from '@pages/Moment'

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
    }
])
