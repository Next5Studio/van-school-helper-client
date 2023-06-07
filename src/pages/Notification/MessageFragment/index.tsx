import React from 'react'
import { ViewFragment } from '@shared/widgets/ViewFragment'
import { ViewSection } from '@shared/widgets/ViewSection'
import { ChatSessionCard } from '@pages/Notification/MessageFragment/ChatSessionCard'

interface IMessageFragmentProps {}

const MessageFragment: React.FC<IMessageFragmentProps> = () => {
    const chatSessions = [
        {
            contact: {
                nickname: '❤社长夫人~',
                avatar: './images/ic_images_avatar2.jpg'
            },
            lastContent: '感觉是在寻找其他的出路',
            lastMessageTime: '5分钟前',
            messageBadge: 0
        },
        {
            contact: {
                nickname: '404 Not Found.',
                avatar: './images/ic_images_avatar.jpg'
            },
            lastContent: '今晚去哪里吃饭啊？',
            lastMessageTime: '19:26',
            messageBadge: 20
        },
        {
            contact: {
                nickname: '粟俊',
                avatar: './images/ic_images_avatar3.jpg'
            },
            lastContent: '走啊去网吧上网',
            lastMessageTime: '2023.04.20 19:26',
            messageBadge: 20
        },
        {
            contact: {
                nickname: 'Colin',
                avatar: './images/ic_images_avatar4.jpg'
            },
            lastContent: '2333',
            lastMessageTime: '2023.04.12 12:31',
            messageBadge: 2
        },
        {
            contact: {
                nickname: '悲剧基本法',
                avatar: './images/ic_images_avatar5.jpg'
            },
            lastContent: '你给我打电话？',
            lastMessageTime: '2023.04.14 18:59',
            messageBadge: 10
        },
        {
            contact: {
                nickname: '林立伟',
                avatar: './images/ic_images_avatar6.jpg'
            },
            lastContent: '来厦门的时候有空一起吃个饭，有点好奇。',
            lastMessageTime: '2023.04.20 19:26',
            messageBadge: 1000
        }
    ]
    return (
        <ViewFragment title={null}>
            <ViewSection title="聊天列表">
                <ul className="mt-4 px-5 space-y-2">
                    {chatSessions.map((chatSession, index) => {
                        return <ChatSessionCard key={index} {...chatSession} />
                    })}
                </ul>
            </ViewSection>
        </ViewFragment>
    )
}

export { MessageFragment }
