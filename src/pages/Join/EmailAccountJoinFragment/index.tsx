import React, { useEffect, useImperativeHandle, useState } from 'react'
import { animated, easings } from '@react-spring/web'
import { toast } from 'react-toastify'

import { useAnimatedFragment } from '@pages/Login/useAnimatedFragment'
import { IHasRequestHandleRef } from '@pages/Join/types'

import { LVanInput } from '@widgets/LVanInput'
import { AccountService } from '@services/account'

interface IEmailAccountJoinFragmentProps {
    setLoading: any
}

const EmailAccountJoinFragment = React.forwardRef<
    IHasRequestHandleRef,
    IEmailAccountJoinFragmentProps
>(({ setLoading }, ref) => {
    const [account, setAccount] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirm, setConfirm] = useState<string>('')

    const [animate, springs] = useAnimatedFragment({
        from: {
            opacity: 0,
            scale: 0.8
        }
    })

    useImperativeHandle(ref, () => ({
        handle: async () => {
            if (!account) {
                toast.error('请输入邮箱地址')
                return false
            }
            if (!password) {
                toast.error('请输入用户密码')
                return false
            }
            if (!confirm) {
                toast.error('请确认用户密码')
                return false
            }
            if (confirm !== password) {
                toast.error('两次输入的密码不一致')
                return false
            }
            setLoading(true)
            const success = await toast
                .promise(AccountService.register(account, password), {
                    pending: '正在请求服务器...',
                    error: {
                        render({ data }: any) {
                            setLoading(false)
                            return data.msg
                        }
                    },
                    success: {
                        render() {
                            setLoading(false)
                            return '注册成功'
                        }
                    }
                })
                .catch((err) => Promise.resolve(err))
            return typeof success === 'string'
        }
    }))

    useEffect(() => {
        animate?.start({
            to: {
                opacity: 1,
                scale: 1
            },
            config: { duration: 500, easing: easings.easeInOutQuad }
        })
    }, [])

    return (
        <animated.div className="space-y-4" style={springs}>
            <LVanInput
                hasClear
                value={account}
                className="bg-gray-100 rounded-lg text-md font-normal"
                placeholder="邮箱地址"
                onChange={setAccount}
                onClear={() => setAccount('')}
            />
            <LVanInput
                hasClear
                type="password"
                value={password}
                className="bg-gray-100 rounded-lg text-md font-normal"
                placeholder="密码"
                onChange={setPassword}
                onClear={() => setPassword('')}
            />
            <LVanInput
                hasClear
                type="password"
                value={confirm}
                className="bg-gray-100 rounded-lg text-md font-normal"
                placeholder="确认密码"
                onChange={setConfirm}
                onClear={() => setConfirm('')}
            />
        </animated.div>
    )
})

export { EmailAccountJoinFragment }
