import React, { PropsWithChildren, useEffect, useRef } from 'react'
import { classNames } from '@shared/utils'
import { App } from '@capacitor/app'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import { LVanBackTop } from './LVanBackTop'

interface ILVanPageProps {
    className?: string
    backTop?: boolean
}

const LVanPage: React.FC<PropsWithChildren<ILVanPageProps>> = ({
    children,
    className,
    backTop = false
}) => {
    const navigate = useNavigate()
    const containerRef = useRef<HTMLDivElement>(null)

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
            {backTop && <LVanBackTop className="!bottom-24" />}
        </div>
    )
}

export { LVanPage }
