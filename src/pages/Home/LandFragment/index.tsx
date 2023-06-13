import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { LVanSlideContainer } from '@widgets/LVanSlideContainer'

import { ViewSection } from '@shared/widgets/ViewSection'
import { ViewMore } from '@pages/Home/widgets/ViewMore'
import { ViewFragment } from '@shared/widgets/ViewFragment'

import { MomentsCard } from '@pages/Home/LandFragment/MomentsCard'
import { LoveWallCard } from '@pages/Home/LandFragment/LoveWallCard'
import { SecondChangeCard } from '@pages/Home/LandFragment/SecondChangeCard'

import { mock } from '@pages/Home/mock'
import { useMomentStore } from '@shared/stores/moment'

const LandFragment: React.FC = () => {
    const navigate = useNavigate()
    const [smoments, fetchMomentList] = useMomentStore(
        ({ list, fetchList }) => [list, fetchList]
    )
    const [loves] = useState(mock.loveWall)
    const [changes] = useState(mock.secondChange)
    const [moments] = useState(mock.moment)

    const onMomentsCardClick = (momentId: string) => {
        navigate(`/moment?momentId=${momentId}`)
    }

    useEffect(() => {
        fetchMomentList()
    }, [])

    return (
        <ViewFragment className="space-y-6" title="校园广场">
            <ViewSection title="校园恋爱季" extra={<ViewMore />}>
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
            <ViewSection title="他们都在卖" extra={<ViewMore />}>
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
            <ViewSection title="更多广场推荐">
                <div className="mt-4 px-5 space-y-8">
                    {moments.map((moment) => (
                        <MomentsCard
                            key={moment.momentId}
                            {...moment}
                            onClick={() => onMomentsCardClick(moment.momentId)}
                        />
                    ))}
                </div>
            </ViewSection>
        </ViewFragment>
    )
}

export { LandFragment }
