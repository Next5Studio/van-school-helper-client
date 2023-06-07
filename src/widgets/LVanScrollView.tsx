import React, { PropsWithChildren, useRef } from 'react'
import { classNames } from '@shared/utils'
import { LVanBackTop } from './LVanBackTop'

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
    const containerRef = useRef<HTMLDivElement>(null)

    return (
        <div {...classNames('relative', 'h-full w-full')}>
            <div
                ref={containerRef}
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
            <LVanBackTop
                className="!bottom-24"
                target={[containerRef.current]}
            />
        </div>
    )
}

export { LVanScrollView }
