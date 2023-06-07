import React, { PropsWithChildren } from 'react'
import { classNames } from '@shared/utils'

interface ILVanHeaderProps {
    className?: string
}

const LVanHeader: React.FC<PropsWithChildren<ILVanHeaderProps>> = ({
    children,
    className
}) => {
    return (
        <div {...classNames('bg-white', 'py-6', 'w-full', className)}>
            <div {...classNames('flex items-center', 'px-4 space-x-3')}>
                {children}
            </div>
        </div>
    )
}

export { LVanHeader }
