import React from 'react'
import { LVanAvatar } from '@widgets/LVanAvatar'
import { LVanSize } from '@widgets/types'
import { classNames } from '@shared/utils'
import { useNavigate } from 'react-router-dom'

interface IChatSessionCardProps {
    sessionId: string
    contact: {
        avatar: string
        nickname: string
    }
    lastContent: string
    lastMessageTime: string
    messageBadge: number
}

const ChatSessionCard: React.FC<IChatSessionCardProps> = ({
    sessionId,
    contact,
    lastContent,
    lastMessageTime,
    messageBadge
}) => {
    const navigate = useNavigate()
    const isMultiNum = messageBadge.toString().length > 1

    const onChatSessionCardClick = () => {
        navigate(`/chat?sessionId=${sessionId}`)
    }

    return (
        <li
            className="bg-gray-50 flex items-center p-4 rounded-xl"
            onClick={onChatSessionCardClick}>
            <LVanAvatar
                src={contact.avatar}
                alt={contact.nickname}
                size={LVanSize.Normal}
            />
            <div className="ml-3 flex-1">
                <p className="text-md font-bold line-clamp-1">
                    {contact.nickname}
                </p>
                <p className="text-xs text-gray-400 font-medium line-clamp-1">
                    {lastContent}
                </p>
            </div>
            <div className="flex flex-col font-medium ml-2">
                <p className="text-xs">{lastMessageTime}</p>
                {!!messageBadge && (
                    <div
                        {...classNames(
                            'mt-1 self-end bg-red-400 text-xs text-white grid place-items-center rounded-full',
                            {
                                'py-0.5 px-2': isMultiNum,
                                'w-5 h-5': !isMultiNum
                            }
                        )}>
                        {messageBadge < 100 ? messageBadge : '99+'}
                    </div>
                )}
            </div>
        </li>
    )
}

export { ChatSessionCard }
