import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import routes from './routes'

import { LVanZustandContainer } from '@widgets/LVanZustandContainer'
import { useUserStore } from '@shared/stores/user'

import '@assets/style.scss'

// 导入全局依赖
import '@shared/utils'
import '@shared/types'
import '@config/index'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <LVanZustandContainer initializeStores={[useUserStore]}>
            <RouterProvider router={routes} />
        </LVanZustandContainer>
    </React.StrictMode>
)
