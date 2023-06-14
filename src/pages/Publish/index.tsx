import React, { useMemo } from 'react'
import { LVanPage } from '@widgets/LVanPage'
import { useSearchParams } from 'react-router-dom'
import { PublishLandFragment } from '@pages/Publish/PublishLandFragment'

enum PublishType {
    Land = 'land',
    SecondChange = 'second-change',
    LoveWall = 'love-wall',
    TemporaryWork = 'temporary-work'
}

function Publish() {
    const [searchParams] = useSearchParams()

    const publishType = useMemo(
        () =>
            (searchParams.get('publishType') as PublishType) ??
            PublishType.Land,
        [searchParams]
    )

    return (
        <LVanPage>
            <PublishLandFragment />
        </LVanPage>
    )
}

export { Publish }
