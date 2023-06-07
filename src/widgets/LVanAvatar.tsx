import React from 'react'
import { classNames } from '@shared/utils'
import { LVanRounded, LVanSize, LVanRoundedMap } from './types'

interface ILVanAvatarProps {
    src?: string
    alt?: string
    size?: number | LVanSize
    rounded?: LVanRounded
    className?: string
    onClick?: () => void
}

const LVanAvatar: React.FC<ILVanAvatarProps> = ({
    src,
    alt = src,
    size = LVanSize.Normal,
    rounded = 'full',
    className,
    onClick
}) => {
    return (
        <div
            {...classNames(
                'overflow-hidden',
                LVanRoundedMap[rounded],
                className
            )}
            style={{
                width: `${size}rem`,
                height: `${size}rem`
            }}
            onClick={onClick}>
            <img
                {...classNames('w-full h-full', 'object-cover')}
                src={src}
                alt={alt}
            />
        </div>
    )
}

export { LVanAvatar }
