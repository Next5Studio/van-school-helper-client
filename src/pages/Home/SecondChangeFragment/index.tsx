import React, { useState } from 'react'
import { ViewFragment } from '@shared/widgets/ViewFragment'
import { mock } from '@pages/Home/mock'
import { SecondChangeCard } from '@pages/Home/LandFragment/SecondChangeCard'

const SecondChangeFragment: React.FC = () => {
    const [changes] = useState(mock.secondChange)
    return (
        <ViewFragment title="二手交易">
            <div className="grid grid-cols-2 gap-x-3 mx-4">
                {changes.map((change) => {
                    return (
                        <SecondChangeCard
                            key={change.changeId}
                            className="!w-full"
                            {...change}
                        />
                    )
                })}
            </div>
        </ViewFragment>
    )
}

export { SecondChangeFragment }
