import React, { useEffect, useRef } from 'react'
import { LVanPage } from '@widgets/LVanPage'
import { LVanHeader } from '@widgets/LVanHeader'
import { LVanBack } from '@widgets/LVanBack'
import { LVanScrollView } from '@widgets/LVanScrollView'
import { ViewInputField } from './widgets/ViewInputField'
import { useUserStore } from '@shared/stores/user'

/**
 * 页面 - 聊天
 */
function Chat() {
    const messageBoxRef = useRef<any>(null)
    const user = useUserStore((state) => state.user)

    useEffect(() => {
        console.log('user ===> ', user)
    }, [user])

    useEffect(() => {
        useUserStore.onLoad()
    }, [])

    // 滚动条置底
    const scrollToBottom = () => {
        messageBoxRef.current.scrollTop =
            messageBoxRef.current.scrollHeight -
            messageBoxRef.current.clientHeight
    }

    const onScrollViewInit = (element: HTMLDivElement) => {
        if (!messageBoxRef.current) {
            messageBoxRef.current = element
        }
        scrollToBottom()
    }

    return (
        <LVanPage>
            <LVanHeader>
                <LVanBack />
                <div>
                    <p>404 Not Found.</p>
                </div>
            </LVanHeader>
            <LVanScrollView
                className="pb-20"
                backTop={false}
                onInit={onScrollViewInit}></LVanScrollView>
            <ViewInputField />
        </LVanPage>
    )
}

export { Chat }
