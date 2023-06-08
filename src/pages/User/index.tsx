import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { LVanPage } from '@widgets/LVanPage'
import { LVanHeader } from '@widgets/LVanHeader'
import { LVanBack } from '@widgets/LVanBack'
import { LVanSlideContainer } from '@widgets/LVanSlideContainer'
import { LVanAvatar } from '@widgets/LVanAvatar'
import { LVanSize } from '@widgets/types'

import { ViewFragment } from '@shared/widgets/ViewFragment'
import { ViewSection } from '@shared/widgets/ViewSection'
import { LoveWallCard } from '@pages/Home/LandFragment/LoveWallCard'
import { SecondChangeCard } from '@pages/Home/LandFragment/SecondChangeCard'
import { MomentsCard } from '@pages/Home/LandFragment/MomentsCard'

import { mock } from './mock'
import { mock as homeMock } from '@pages/Home/mock'

/**
 * 页面 - 用户中心
 */
function User() {
    const navigate = useNavigate()
    const [user] = useState(mock)
    const [loves] = useState(homeMock.loveWall)
    const [changes] = useState(homeMock.secondChange)
    const [moments] = useState(homeMock.moment)

    const onMomentsCardClick = (momentId: string) => {
        navigate(`/moment?momentId=${momentId}`)
    }

    return (
        <LVanPage backTop>
            <div className="relative z-10">
                <LVanHeader className="absolute z-20 !bg-transparent">
                    <LVanBack className="text-white" />
                </LVanHeader>
                <img
                    className="h-96 z-10 w-full object-cover brightness-75"
                    src={user.background}
                    alt={user.userId}
                />
                <div className="absolute bottom-0 w-full px-4 z-20 flex items-center mb-2">
                    <LVanAvatar
                        className="border-4 border-white"
                        size={LVanSize.Large}
                        src={user.avatar}
                        alt={user.nickname}
                    />
                    <div className="ml-2 flex-1 text-white">
                        <p className="font-bold">{user.nickname}</p>
                        <p className="text-xs -mt-0.5">
                            {user?.education?.college} · {user?.education?.clz}
                        </p>
                    </div>
                </div>
            </div>
            <div>
                <ViewFragment className="space-y-6" title="">
                    <ViewSection title="表白墙">
                        <LVanSlideContainer perViews="auto" freeMode mousewheel>
                            {loves.map((love) => (
                                <LVanSlideContainer.Content
                                    key={love.wallId}
                                    className="!w-auto ml-4 last:mr-4">
                                    <LoveWallCard className="w-64" {...love} />
                                </LVanSlideContainer.Content>
                            ))}
                        </LVanSlideContainer>
                    </ViewSection>
                    <ViewSection title="他的二手">
                        <LVanSlideContainer
                            className="-mt-2"
                            swiperClassName="!pl-4"
                            perViews="auto"
                            grid={{
                                fill: 'row',
                                rows: 2
                            }}
                            freeMode>
                            {changes.map((change) => (
                                <LVanSlideContainer.Content
                                    key={change.changeId}
                                    className="!w-auto mr-4">
                                    <SecondChangeCard {...change} />
                                </LVanSlideContainer.Content>
                            ))}
                        </LVanSlideContainer>
                    </ViewSection>
                    <ViewSection title="他的动态">
                        <div className="mt-4 px-5 space-y-8 pb-4">
                            {moments.map((moment) => (
                                <MomentsCard
                                    key={moment.momentId}
                                    {...moment}
                                    onClick={() =>
                                        onMomentsCardClick(moment.momentId)
                                    }
                                />
                            ))}
                        </div>
                    </ViewSection>
                </ViewFragment>
            </div>
        </LVanPage>
    )
}

export { User }
