import React, { PropsWithChildren } from 'react'

interface ILVanShowProps {
    isShow: boolean
}

const LVanShow: React.FC<PropsWithChildren<ILVanShowProps>> = ({
    children,
    isShow = false
}) => {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{isShow && children}</>
}

export { LVanShow }
