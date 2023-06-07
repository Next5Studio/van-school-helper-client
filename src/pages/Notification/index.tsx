import React, { useState } from 'react'

import { LVanPage } from '@widgets/LVanPage'
import { LVanHeader } from '@widgets/LVanHeader'
import { LVanBack } from '@widgets/LVanBack'
import { LVanNavigator } from '@widgets/LVanNavigator'
import { classNames } from '@shared/utils'
import { LVanSlideContainer } from '@widgets/LVanSlideContainer'
import { LVanScrollView } from '@widgets/LVanScrollView'
import { MessageFragment } from '@pages/Notification/MessageFragment'

enum NotificationType {
    Message = 'message',
    Notification = 'notification'
}

function Notification() {
    const [notificationType, setNotificationType] = useState(
        NotificationType.Message
    )

    return (
        <LVanPage>
            <LVanHeader className="relative">
                <LVanBack className="absolute" />
                <LVanNavigator
                    defaultNavigatorKey="message"
                    className="text-xs text-gray-500 font-bold my-0 !mx-auto p-1 bg-gray-100 overflow-hidden rounded-md"
                    onNavigatorChange={(currNavigatorKey) =>
                        setNotificationType(
                            currNavigatorKey as NotificationType
                        )
                    }>
                    <LVanNavigator.Item
                        navigatorKey="message"
                        {...classNames(
                            'p-1.5 px-4 transition-all duration-100',
                            {
                                'rounded-md bg-white !px-5 text-gray-600':
                                    notificationType ===
                                    NotificationType.Message
                            }
                        )}>
                        聊天
                    </LVanNavigator.Item>
                    <LVanNavigator.Item
                        navigatorKey="notification"
                        {...classNames(
                            'p-1.5 px-4 transition-all duration-100',
                            {
                                'rounded-md bg-white !px-5 text-gray-600':
                                    notificationType ===
                                    NotificationType.Notification
                            }
                        )}>
                        通知
                    </LVanNavigator.Item>
                </LVanNavigator>
            </LVanHeader>
            <LVanSlideContainer className="flex-1">
                <LVanSlideContainer.Content>
                    <LVanScrollView>
                        <MessageFragment />
                    </LVanScrollView>
                </LVanSlideContainer.Content>
            </LVanSlideContainer>
        </LVanPage>
    )
}

export { Notification }
