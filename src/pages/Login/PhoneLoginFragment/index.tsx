import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useState
} from 'react'
import { animated, easings } from '@react-spring/web'
import { toast } from 'react-toastify'
import { useCountdown } from 'usehooks-ts'

import { LVanInput } from '@widgets/LVanInput'
import { useAnimatedFragment } from '@pages/Login/useAnimatedFragment'
import { ILoginFragmentRef } from '@pages/Login/types'
import { AccountService } from '@services/account'

interface IPhoneLoginFragmentProps {
    setLoading: any
}

const PhoneLoginFragment = forwardRef<
    ILoginFragmentRef,
    IPhoneLoginFragmentProps
>(({ setLoading }, ref) => {
    const [value, setValue] = useState('')
    const [verifyCode, setVerifyCode] = useState('')
    const [count, { startCountdown, resetCountdown }] = useCountdown({
        countStart: 60,
        intervalMs: 1000
    })

    const [animate, springs] = useAnimatedFragment({
        from: {
            opacity: 0,
            scale: 0.8
        }
    })

    useImperativeHandle(ref, () => ({
        login: async () => {
            if (!value) {
                toast.error('请输入手机号')
                return false
            }
            if (!verifyCode) {
                toast.error('请输入短信验证码')
                return false
            }
            setLoading(true)
            const res = await toast
                .promise(AccountService.login('phoneNum', value, verifyCode), {
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
                })
                .catch((err) => Promise.resolve(err))
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

    useEffect(() => {
        if (count === 0) {
            resetCountdown()
        }
    }, [count])

    const onBtnSendVerifyCodeClick = async () => {
        if (count !== 60) return
        if (!value) {
            toast.error('请输入手机号')
            return
        }
        await toast.promise(AccountService.preLogin(value), {
            pending: '正在请求服务器...',
            error: {
                render({ data }: any) {
                    return data.msg
                }
            },
            success: {
                render() {
                    startCountdown()
                    return '短信验证码已发送'
                }
            }
        })
    }

    return (
        <animated.div style={springs}>
            <LVanInput.PhoneNumber
                value={value}
                className="bg-gray-100 rounded-lg text-md font-normal"
                placeholder="中国大陆手机号码"
                hasClear
                onChange={setValue}
                onClear={() => setValue('')}
            />
            <div
                className="text-xs my-2 underline text-right"
                onClick={onBtnSendVerifyCodeClick}>
                {count === 60 ? '发送验证码' : `${count}秒后可以重新发送`}
            </div>
            <LVanInput
                value={verifyCode}
                className="bg-gray-100 rounded-lg text-md font-normal"
                placeholder="短信验证码"
                hasClear
                onChange={setVerifyCode}
                onClear={() => setVerifyCode('')}
            />
        </animated.div>
    )
})

export { PhoneLoginFragment }
