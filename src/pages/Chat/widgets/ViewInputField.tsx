import React, { useState } from 'react'
import { Send } from 'react-feather'
import { LVanInput } from '@widgets/LVanInput'

const ViewInputField: React.FC = () => {
    const [message, setMessage] = useState('')

    const onBtnSendClick = () => {}
    return (
        <div className="fixed bottom-0 border-t w-full flex">
            <LVanInput
                className="flex-1"
                placeholder="友善的话语是沟通的开始喔~"
                value={message}
                onChange={setMessage}
            />
            <div
                className="bg-purple-400 flex items-center px-6 text-white"
                onClick={onBtnSendClick}>
                <Send className="mr-2" size={16} />{' '}
                <span className="text-xs">发送</span>
            </div>
        </div>
    )
}

export { ViewInputField }
