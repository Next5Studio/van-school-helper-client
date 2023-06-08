import React, { PropsWithChildren, useEffect, useRef } from 'react'
import { classNames } from '@shared/utils'
import { LVanBackTop } from './LVanBackTop'

interface ILVanScrollViewProps {
    padding?: {
        top?: number
        bottom?: number
    }
    className?: string
    backTop?: boolean
    onInit?: (element: HTMLDivElement) => void
}

const LVanScrollView: React.FC<PropsWithChildren<ILVanScrollViewProps>> = ({
    children,
    padding,
    backTop = true,
    className,
    onInit
}) => {
    const containerRef = useRef<any>(null)

    return (
        <div {...classNames('relative', 'h-full w-full')}>
            <div
                ref={(ele) => {
                    containerRef.current = ele
                    if (ele) {
                        onInit?.(ele)
                    }
                }}
                {...classNames(
                    'absolute top-0 left-0',
                    'h-full w-full',
                    'overflow-scroll',
                    className
                )}
                style={{
                    paddingTop: padding?.top,
                    paddingBottom: padding?.bottom
                }}>
                {children}
            </div>
            {backTop && (
                <LVanBackTop
                    className="!bottom-24"
                    target={[containerRef.current]}
                />
            )}
        </div>
    )
}

export { LVanScrollView }
