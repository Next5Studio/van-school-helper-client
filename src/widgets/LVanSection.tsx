import React, { PropsWithChildren, ReactNode } from 'react'
import { classNames } from '@shared/utils'

interface ILVanSectionProps {
    title: string | ReactNode
}

const LVanSection: React.FC<PropsWithChildren<ILVanSectionProps>> = ({
    children,
    title
}) => {
    return (
        <div {...classNames('flex flex-col', 'h-full')}>
            <div className="flex">{title}</div>
            <div className="flex-1">{children}</div>
        </div>
    )
}

export { LVanSection }
