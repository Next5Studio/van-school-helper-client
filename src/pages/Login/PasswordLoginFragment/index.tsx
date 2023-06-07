import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useState
} from 'react'
import { animated, easings } from '@react-spring/web'

import { LVanInput } from '@widgets/LVanInput'
import { useAnimatedFragment } from '@pages/Login/useAnimatedFragment'
import { ILoginFragmentRef } from '@pages/Login/types'
import { toast } from 'react-toastify'
import { AccountService } from '@services/account'

interface IPasswordLoginFragmentProps {
    setLoading: any
}

const PasswordLoginFragment = forwardRef<
    ILoginFragmentRef,
    IPasswordLoginFragmentProps
>(({ setLoading }, ref) => {
    const [account, setAccount] = useState('')
    const [password, setPassword] = useState('')

    const [animate, springs] = useAnimatedFragment({
        from: {
            opacity: 0,
            scale: 0.8
        }
    })

    useImperativeHandle(ref, () => ({
        login: async () => {
            if (!account) {
                toast.error('请输入邮箱地址')
                return false
            }
            if (!password) {
                toast.error('请输入用户密码')
                return false
            }
            setLoading(true)
            const res = await toast.promise(
                AccountService.login('account', account, password),
                {
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
                            return '登录成功'
                        }
                    }
                }
            )
            return typeof res === 'string'
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
            <div>
                <LVanInput
                    hasClear
                    type="password"
                    value={password}
                    className="bg-gray-100 rounded-lg text-md font-normal"
                    placeholder="密码"
                    onChange={setPassword}
                    onClear={() => setPassword('')}
                />
                <a className="text-xs float-right mt-2 underline" href="#">
                    忘记密码？
                </a>
            </div>
        </animated.div>
    )
})

export { PasswordLoginFragment }
