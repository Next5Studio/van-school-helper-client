import React, { PropsWithChildren, ReactNode } from 'react'
import { LVanSection } from '@widgets/LVanSection'
import { classNames } from '../utils'

interface IViewSectionProps {
    title: string
    extra?: ReactNode
    className?: string
}

const ViewSection: React.FC<PropsWithChildren<IViewSectionProps>> = ({
    title,
    extra,
    children,
    className
}) => {
    return (
        <LVanSection
            title={
                <div {...classNames('flex items-center flex-1', 'px-5')}>
                    <p {...classNames('flex-1', 'text-xl font-extrabold')}>
                        {title}
                    </p>
                    {extra}
                </div>
            }>
            <div {...classNames('mt-3', className)}>{children}</div>
        </LVanSection>
    )
}

export { ViewSection }
