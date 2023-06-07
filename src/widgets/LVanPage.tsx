import React, { PropsWithChildren, useEffect } from 'react'
import { classNames } from '@shared/utils'
import { App } from '@capacitor/app'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

interface ILVanPageProps {
    className?: string
}

const LVanPage: React.FC<PropsWithChildren<ILVanPageProps>> = ({
    children,
    className
}) => {
    const navigate = useNavigate()

    useEffect(() => {
        const listener = () => {
            navigate(-1)
        }
        App.addListener('backButton', listener)
        return () => {
            App.removeAllListeners()
        }
    }, [])

    return (
        <div
            {...classNames(
                'relative h-screen subpixel-antialiased text-gray-700 flex flex-col',
                className
            )}>
            <ToastContainer position="top-center" />
            {children}
        </div>
    )
}

export { LVanPage }
