import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Smartphone } from 'react-feather'

import { EmailAccountJoinFragment } from '@pages/Join/EmailAccountJoinFragment'
import { useVisualViewportEffect } from '@pages/Login/useVisualViewportEffect'
import { LVanPage } from '@widgets/LVanPage'
import { LVanSlideContainer } from '@widgets/LVanSlideContainer'
import { LVanShow } from '@widgets/LVanShow'

import { classNames, isMobile } from '@shared/utils'
import { LVanLoadingButton } from '@widgets/LVanLoadingButton'
import { useMultipleRefHandler } from '@shared/useMultipleRefHandler'
import { IHasRequestHandleRef } from '@pages/Join/types'
import { BindPhoneNumFragment } from '@pages/Join/BindPhoneNumFragment'
import { Swiper } from 'swiper'

const nextStepTips = ['下一步', '开始探索', '开始探索']

function Join() {
    const navigate = useNavigate()
    const [isKeyboardOn, setIsKeyboardOn] = useState(false)
    const [loading, setLoading] = useState(false)
    const [fragmentSwiper, setFragmentSwiper] = useState<Swiper>()

    const firstStepRef = useRef<IHasRequestHandleRef>(null)
    const secondStepRef = useRef<IHasRequestHandleRef>(null)

    const currentInstance = useMultipleRefHandler<IHasRequestHandleRef>([
        firstStepRef,
        secondStepRef
    ])

    useVisualViewportEffect(() => {
        if (isMobile()) {
            setIsKeyboardOn(true)
        }
        return () => setIsKeyboardOn(false)
    }, 300)

    const onBtnNextStepClick = async () => {
        if (await currentInstance.instance?.handle()) {
            currentInstance.next()

            if (currentInstance.index < 1) {
                fragmentSwiper?.slideNext()
            } else {
                navigate('/', { replace: true })
            }
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
            <LVanSlideContainer
                className="swiper-no-swiping"
                effect="slide"
                space={10}
                onInit={setFragmentSwiper}>
                <LVanSlideContainer.Content>
                    <div className="bg-white">
                        <EmailAccountJoinFragment
                            ref={firstStepRef}
                            setLoading={setLoading}
                        />
                    </div>
                </LVanSlideContainer.Content>
                <LVanSlideContainer.Content>
                    <div className="bg-white">
                        <BindPhoneNumFragment
                            ref={secondStepRef}
                            setLoading={setLoading}
                        />
                    </div>
                </LVanSlideContainer.Content>
            </LVanSlideContainer>
            <LVanLoadingButton
                className="mt-10"
                onClick={onBtnNextStepClick}
                loading={loading}>
                {nextStepTips[currentInstance.index]}
            </LVanLoadingButton>
            <LVanShow isShow={!isKeyboardOn}>
                <ul className="relative mt-10 border-t border-gray-200 flex justify-around">
                    <span className="absolute bg-white text-xs text-gray-300 -translate-y-1/2 px-4">
                        或使用下面方式开始登陆
                    </span>
                    <li
                        {...classNames('mt-6 p-4 bg-gray-100 rounded-full')}
                        onClick={() =>
                            navigate('/login?loginType=password', {
                                replace: true
                            })
                        }>
                        <Lock size={20} />
                    </li>
                    <li
                        {...classNames('mt-6 p-4 bg-gray-100 rounded-full')}
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

export { Join }
