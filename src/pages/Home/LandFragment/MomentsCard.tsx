import React from 'react'
import { Heart, MessageSquare, Send } from 'react-feather'

import { LVanAvatar } from '@widgets/LVanAvatar'
import { LVanSize } from '@widgets/types'
import { ViewMore } from '@pages/Home/widgets/ViewMore'

import { classNames } from '@shared/utils'

interface IMomentsCardProps {
    gallery: Array<string>
    content: string
    user: {
        userId: string
        nickname: string
        avatar: string
        educationInformation: {
            school: string
            department: string
            major: string
            classroom: string
        }
    }
    onClick?: () => void
}

interface IGalleryLayout {
    [key: number]: {
        wrapper: string
        items: Array<string>
        aspects: Array<string>
    }
}

const galleryLayout: IGalleryLayout = {
    1: {
        wrapper: 'grid w-full',
        items: ['rounded-lg'],
        aspects: ['1']
    },
    2: {
        wrapper: 'grid grid-cols-2 gap-3 w-full',
        items: ['rounded-lg', 'rounded-lg'],
        aspects: ['1', '1']
    },
    3: {
        wrapper: 'grid grid-cols-3 gap-3 w-full',
        items: ['rounded-lg col-span-2 row-span-2', 'rounded-lg', 'rounded-lg'],
        aspects: ['1', '1', '1']
    },
    4: {
        wrapper: 'grid grid-cols-2 gap-3 w-full',
        items: ['rounded-lg', 'rounded-lg', 'rounded-lg', 'rounded-lg'],
        aspects: ['1', '1', '1', '1']
    },
    5: {
        wrapper: 'grid grid-cols-3 gap-3 w-full',
        items: [
            'rounded-lg',
            'rounded-lg row-span-2 col-span-2',
            'rounded-lg',
            'rounded-lg col-span-2',
            'rounded-lg'
        ],
        aspects: ['1', '1', '1', 'auto', '1']
    },
    6: {
        wrapper: 'grid grid-cols-3 gap-3 w-full',
        items: [
            'rounded-lg',
            'rounded-lg col-span-2',
            'rounded-lg col-span-2',
            'rounded-lg',
            'rounded-lg',
            'rounded-lg col-span-2'
        ],
        aspects: ['1', 'auto', 'auto', '1', '1', 'auto']
    },
    8: {
        wrapper: 'grid grid-cols-4 gap-3 w-full',
        items: [
            'rounded-lg',
            'rounded-lg',
            'rounded-lg',
            'rounded-lg',
            'rounded-lg',
            'rounded-lg',
            'rounded-lg',
            'rounded-lg'
        ],
        aspects: ['1', '1', '1', '2 / 1', '1']
    },
    9: {
        wrapper: 'grid grid-cols-3 gap-3 w-full',
        items: [
            'rounded-lg',
            'rounded-lg',
            'rounded-lg',
            'rounded-lg',
            'rounded-lg',
            'rounded-lg',
            'rounded-lg',
            'rounded-lg',
            'rounded-lg'
        ],
        aspects: ['1', '1', '1', '1', '1', '1', '1', '1', '1']
    }
}

const Gallery = ({ gallery }: { gallery: Array<string> }) => {
    const layout = galleryLayout[gallery.length]

    if (!layout) return null

    return (
        <div className={layout.wrapper}>
            {gallery.map((image, index) => (
                <div
                    {...classNames(
                        layout.items[index],
                        'w-full overflow-hidden relative'
                    )}
                    style={{
                        aspectRatio: layout.aspects[index]
                    }}
                    key={image}>
                    <img
                        className="absolute w-full h-full object-cover object-center"
                        src={image}
                        alt={image}
                    />
                </div>
            ))}
        </div>
    )
}

const MomentsCard: React.FC<IMomentsCardProps> = ({
    gallery,
    content,
    user,
    onClick
}) => {
    return (
        <div className="flex flex-col" onClick={onClick}>
            <div className="flex items-center mb-2">
                <LVanAvatar
                    size={LVanSize.Normal}
                    src={user.avatar}
                    alt={user.nickname}
                />
                <div className="ml-2 flex-1">
                    <p className="font-bold">{user.nickname}</p>
                    <p className="text-xs -mt-0.5">
                        {user?.educationInformation?.school} ·{' '}
                        {user?.educationInformation?.classroom}
                    </p>
                </div>
                <ViewMore direction="vertical" />
            </div>
            <p className="px-1 mb-3">{content}</p>
            <Gallery gallery={gallery} />
            <ul className="flex items-center mt-4 flex-1 flex space-x-6">
                <li className="inline-flex items-center">
                    <Heart size={20} />
                    <span className="ml-1 text-sm">1658</span>
                </li>
                <li className="inline-flex items-center">
                    <MessageSquare size={20} />
                    <span className="ml-1 text-sm">1658</span>
                </li>
                <li className="inline-flex items-center">
                    <Send size={20} />
                    <span className="ml-1 text-sm">1658</span>
                </li>
            </ul>
        </div>
    )
}

export { MomentsCard }
