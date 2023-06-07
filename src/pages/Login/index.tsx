import React, { useMemo, useRef, useState } from 'react'
import { Lock, Smartphone } from 'react-feather'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { PhoneLoginFragment } from '@pages/Login/PhoneLoginFragment'
import { PasswordLoginFragment } from '@pages/Login/PasswordLoginFragment'
import { ILoginFragmentRef } from '@pages/Login/types'
import { useVisualViewportEffect } from '@pages/Login/useVisualViewportEffect'
import { LVanShow } from '@widgets/LVanShow'
import { LVanLoadingButton } from '@widgets/LVanLoadingButton'
import { LVanPage } from '@widgets/LVanPage'

import { classNames, isMobile } from '@shared/utils'

enum LoginType {
    Phone = 'phone',
    Password = 'password'
}

const loginBtnText = {
    [LoginType.Phone]: '下一步',
    [LoginType.Password]: '登录'
}

function Login() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const loginFragmentRef = useRef<ILoginFragmentRef>(null)
    const [isKeyboardOn, setIsKeyboardOn] = useState(false)
    const [loading, setLoading] = useState(false)

    const loginType = useMemo(
        () => (searchParams.get('loginType') as LoginType) || LoginType.Phone,
        [searchParams]
    )

    const LoginFragment = useMemo(() => {
        const LoginFragmentMap = {
            phone: PhoneLoginFragment,
            password: PasswordLoginFragment
        }
        return LoginFragmentMap[loginType]
    }, [loginType])

    useVisualViewportEffect(() => {
        if (isMobile()) {
            setIsKeyboardOn(true)
        }
        return () => setIsKeyboardOn(false)
    }, 300)

    const onBtnLoginClick = async () => {
        if (await loginFragmentRef.current?.login()) {
            setTimeout(
                () =>
                    navigate('/', {
                        replace: true
                    }),
                3000
            )
        }
    }

    return (
        <LVanPage className="py-12 px-10">
            <div className="mt-12 flex-1">
                <h1 className="text-6xl font-extrabold">探索</h1>
                <p className="text-xl font-medium mt-4">
                    校园新奇生活、创意想法和点子、寻求帮助，寻找志同道合的人~
                </p>
            </div>
            <LoginFragment setLoading={setLoading} ref={loginFragmentRef} />
            <LVanLoadingButton
                loading={loading}
                className="mt-10"
                onClick={onBtnLoginClick}>
                {loginBtnText[loginType]}
            </LVanLoadingButton>
            <LVanShow isShow={!isKeyboardOn}>
                <ul className="relative mt-10 border-t border-gray-200 flex justify-around">
                    <span className="absolute bg-white text-xs text-gray-300 -translate-y-1/2 px-4">
                        使用下面方式登陆
                    </span>
                    <li
                        {...classNames('mt-6 p-4 bg-gray-100 rounded-full', {
                            'bg-purple-400': loginType === LoginType.Password,
                            '!text-white': loginType === LoginType.Password,
                            'text-gray-700': loginType !== LoginType.Password
                        })}
                        onClick={() =>
                            navigate('/login?loginType=password', {
                                replace: true
                            })
                        }>
                        <Lock size={20} />
                    </li>
                    <li
                        {...classNames('mt-6 p-4 bg-gray-100 rounded-full', {
                            'bg-purple-400': loginType === LoginType.Phone,
                            '!text-white': loginType === LoginType.Phone,
                            'text-gray-700': loginType !== LoginType.Phone
                        })}
                        onClick={() =>
                            navigate('/login?loginType=phone', {
                                replace: true
                            })
                        }>
                        <Smartphone size={20} />
                    </li>
                </ul>
            </LVanShow>
        </LVanPage>
    )
}

export { Login }
