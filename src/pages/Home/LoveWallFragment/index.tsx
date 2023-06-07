import React, { useState } from 'react'
import { ViewFragment } from '@shared/widgets/ViewFragment'
import { mock } from '@pages/Home/mock'
import { LoveWallCard } from '@pages/Home/LandFragment/LoveWallCard'

const LoveWallFragment: React.FC = () => {
    const [loves] = useState(mock.loveWall)

    return (
        <ViewFragment title="表白墙">
            <div className="px-5 space-y-6">
                {loves.map((love) => {
                    return <LoveWallCard key={love.wallId} {...love} />
                })}
            </div>
        </ViewFragment>
    )
}

export { LoveWallFragment }
