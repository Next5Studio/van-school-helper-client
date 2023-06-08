import React, { PropsWithChildren, useEffect } from 'react'

interface ILVanZustandContainerProps {
    initializeStores?: Array<{
        onLoad: () => void
    }>
}

const LVanZustandContainer: React.FC<
    PropsWithChildren<ILVanZustandContainerProps>
> = ({ initializeStores = [], children }) => {
    useEffect(() => {
        initializeStores?.forEach((store) => store.onLoad())
    }, [])

    return <>{children}</>
}

export { LVanZustandContainer }
