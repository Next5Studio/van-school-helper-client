import React, { useState } from 'react'
import { MessageSquare, User } from 'react-feather'
import { useNavigate } from 'react-router-dom'
import { Swiper } from 'swiper'

import { LVanPage } from '@widgets/LVanPage'
import { LVanHeader } from '@widgets/LVanHeader'
import { LVanSearchBar } from '@widgets/LVanSearchBar'
import { LVanAvatar } from '@widgets/LVanAvatar'
import { LVanScrollView } from '@widgets/LVanScrollView'
import { LVanSize } from '@widgets/types'
import { LVanBadge } from '@widgets/LVanBadge'
import { LVanSlideContainer } from '@widgets/LVanSlideContainer'
import { LVanNavigator } from '@widgets/LVanNavigator'

import { LandFragment } from './LandFragment'
import { SecondChangeFragment } from '@pages/Home/SecondChangeFragment'
import { LoveWallFragment } from '@pages/Home/LoveWallFragment'
import { TemporaryWorkFragment } from '@pages/Home/TemporaryWorkFragment'
import { ViewPublishButtonWrap } from '@pages/Home/widgets/ViewPublishButtonWrap'

import { classNames } from '@shared/utils'
import { useUserStore } from '@shared/stores/user'

function Home() {
    const navigate = useNavigate()
    const { isLogin, userId } = useUserStore((states) => states.user)
    const [navigatorHeight, setNavigatorHeight] = useState(0)
    const [fragmentSwiper, setFragmentSwiper] = useState<Swiper>()
    const [currFragmentIdx, setCurrFragmentIdx] = useState(0)

    const onNavigatorMeasured = (data?: DOMRect) => {
        console.log('Measured ===> ', data)
        setNavigatorHeight(data?.height || 0)
    }

    const onFragmentSlided = (swiper: Swiper) => {
        console.log('Navigate to ===> ', swiper.activeIndex)
        setCurrFragmentIdx(swiper.activeIndex)
    }

    // 用户头像点击
    const onAvatarClicked = () => {
        if (!isLogin) {
            navigate('/login?loginType=phone')
        } else {
            navigate(`/user?userId=${userId}`)
        }
    }

    const handleNavigator = (index: number) => {
        fragmentSwiper?.slideTo(index)
    }

    const onPublishBtnClick = (type: string) =>
        navigate(`publish?publishType=${type}`)

    return (
        <LVanPage className="overflow-hidden">
            <LVanHeader>
                <LVanSearchBar disabled size={LVanSize.Normal} />
                <LVanBadge className="bg-transparent" size={LVanSize.Normal}>
                    <LVanBadge.Dot
                        color="#524298"
                        offset={{
                            top: 6,
                            right: 6
                        }}
                    />
                    <MessageSquare
                        color="#524298"
                        size={20}
                        onClick={() => navigate('/notification')}
                    />
                </LVanBadge>
                {isLogin ? (
                    <LVanAvatar
                        src="./images/ic_images_avatar.jpg"
                        size={LVanSize.Small}
                        onClick={onAvatarClicked}
                    />
                ) : (
                    <div
                        className="rounded-full bg-gray-200 w-8 h-8 grid place-items-center"
                        onClick={onAvatarClicked}>
                        <User size={16} color="#524298" />
                    </div>
                )}
            </LVanHeader>
            <LVanSlideContainer
                noSwipingClassName="fragment-no-swiping"
                className="flex-1 z-10 fragment-no-swiping"
                onInit={setFragmentSwiper}
                onSlide={onFragmentSlided}>
                <LVanSlideContainer.Content>
                    <LVanScrollView padding={{ bottom: navigatorHeight }}>
                        <LandFragment />
                    </LVanScrollView>
                </LVanSlideContainer.Content>
                <LVanSlideContainer.Content>
                    <LVanScrollView padding={{ bottom: navigatorHeight }}>
                        <SecondChangeFragment />
                    </LVanScrollView>
                </LVanSlideContainer.Content>
                <LVanSlideContainer.Content>
                    <LVanScrollView padding={{ bottom: navigatorHeight }}>
                        <LoveWallFragment />
                    </LVanScrollView>
                </LVanSlideContainer.Content>
                <LVanSlideContainer.Content>
                    <LVanScrollView padding={{ bottom: navigatorHeight }}>
                        <TemporaryWorkFragment />
                    </LVanScrollView>
                </LVanSlideContainer.Content>
            </LVanSlideContainer>
            <LVanNavigator
                defaultNavigatorKey="land"
                {...classNames(
                    'absolute bottom-0 left-0 right-0',
                    'py-6 z-20',
                    'bg-white bg-opacity-70 backdrop-filter backdrop-blur-xl'
                )}
                onMeasure={onNavigatorMeasured}>
                {config.app.tabs.map(({ name, title, icon: Icon }, index) => {
                    const iconColor =
                        currFragmentIdx === index
                            ? config.app.colors['--accent-color']
                            : '#9CA3AF'
                    return (
                        <LVanNavigator.Item key={name} navigatorKey={name}>
                            <Icon
                                size={20}
                                color={iconColor}
                                onClick={() => handleNavigator(index)}
                            />
                        </LVanNavigator.Item>
                    )
                })}
                <ViewPublishButtonWrap>
                    {config.app.publishButtons.map((btn) => (
                        <ViewPublishButtonWrap.PublishButton
                            key={btn.title}
                            onClick={() => onPublishBtnClick(btn.name)}
                            {...classNames(
                                'justify-center text-white font-bold items-center',
                                btn.color
                            )}>
                            <btn.icon size={20} className="mr-4" />
                            {btn.title}
                        </ViewPublishButtonWrap.PublishButton>
                    ))}
                </ViewPublishButtonWrap>
            </LVanNavigator>
        </LVanPage>
    )
}

export { Home }
