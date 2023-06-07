import React, { PropsWithChildren } from 'react'
import { classNames } from '@shared/utils'
import { LVanRounded, LVanRoundedMap, LVanSize } from './types'

interface ILVanBadgeInnerProps {
    size?: number | LVanSize
    rounded?: LVanRounded
    className?: string
}

const LVanBadgeInner: React.FC<PropsWithChildren<ILVanBadgeInnerProps>> = ({
    children,
    className,
    size = LVanSize.Normal,
    rounded = 'full'
}) => {
    return (
        <div
            {...classNames(
                'relative',
                'grid place-content-center',
                LVanRoundedMap[rounded],
                className
            )}
            style={{
                height: `${size}rem`,
                width: `${size}rem`
            }}>
            {children}
        </div>
    )
}

interface ILVanBadgeDotInnerProps {
    offset?: {
        top?: string | number
        right?: string | number
        bottom?: string | number
        left?: string | number
    }
    color?: string
    className?: string
}

const LVanBadgeDotInner: React.FC<
    PropsWithChildren<ILVanBadgeDotInnerProps>
> = ({
    offset = {
        top: 0,
        right: 0
    },
    color = '#524298',
    children,
    className
}) => {
    return (
        <span
            {...classNames('absolute block', className)}
            style={{
                ...offset,
                minWidth: '.45rem',
                minHeight: '.45rem',
                borderRadius: '50%',
                backgroundColor: color
            }}>
            {children}
        </span>
    )
}

type LVanBadgeInnerType = typeof LVanBadgeInner
interface ILVanBadgeType extends LVanBadgeInnerType {
    Dot: typeof LVanBadgeDotInner
}

const LVanBadge = LVanBadgeInner as ILVanBadgeType
LVanBadge.Dot = LVanBadgeDotInner

export { LVanBadge }
