import React from 'react'
import { ThumbsUp } from 'react-feather'
import { LVanAvatar } from '@widgets/LVanAvatar'
import { classNames } from '@shared/utils'

interface ILoveWallCardProps {
    className?: string
    content?: string
    mask?: string
    from?: {
        avatar: string
        nickname: string
        userId: string
    }
}

const LoveWallCard: React.FC<ILoveWallCardProps> = ({
    className,
    content,
    mask,
    from
}) => {
    return (
        <div className={className}>
            <div
                className="relative my-1.5 rounded-xl overflow-hidden bg-center bg-no-repeat bg-cover"
                style={{
                    backgroundImage: `url(${mask})`
                }}>
                {/* 磨砂透明遮罩 */}
                <div className="absolute top-0 right-0 bottom-0 left-0 rounded-xl z-10 bg-black bg-opacity-10 backdrop-filter backdrop-blur-xl" />
                <div className="relative p-4 z-20 text-white overflow-ellipsis overflow-hidden">
                    <p className="w-full max-h-20 text-md font-bold line-clamp-3">{`”${content}“`}</p>
                </div>
            </div>
            <div className="flex item-center mt-3">
                <LVanAvatar src={from?.avatar} size={2.25} />
                <div className="flex flex-col justify-center w-1 flex-1 mx-2 text-sm font-black">
                    <p className="truncate">{from?.nickname}</p>
                    <span className="block -mt-0.5 text-xs text-gray-400 font-normal">
                        发布于 · 2023.03.29
                    </span>
                </div>

                <button className="flex items-center px-4 py-2 rounded-md bg-red-300 text-xs font-bold text-white">
                    <ThumbsUp color="white" size={14} />
                    <span className="ml-2">应援</span>
                </button>
            </div>
        </div>
    )
}

export { LoveWallCard }
