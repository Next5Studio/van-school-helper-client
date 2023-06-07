import React, { PropsWithChildren } from 'react'
import { classNames } from '@shared/utils'

interface ILVanScrollViewProps {
    padding?: {
        top?: number
        bottom?: number
    }
}

const LVanScrollView: React.FC<PropsWithChildren<ILVanScrollViewProps>> = ({
    children,
    padding
}) => {
    return (
        <div {...classNames('relative', 'h-full w-full')}>
            <div
                {...classNames(
                    'absolute top-0 left-0',
                    'h-full w-full',
                    'overflow-scroll'
                )}
                style={{
                    paddingTop: padding?.top,
                    paddingBottom: padding?.bottom
                }}>
                {children}
            </div>
        </div>
    )
}

export { LVanScrollView }
