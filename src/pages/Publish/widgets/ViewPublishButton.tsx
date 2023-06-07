import React, { PropsWithChildren } from 'react'

interface IViewPublishButtonProps {
    className?: string
}

const ViewPublishButton: React.FC<
    PropsWithChildren<IViewPublishButtonProps>
> = ({ children, className }) => {
    return (
        <button className="bg-blue-400 text-white text-xs font-semibold">
            children
        </button>
    )
}

export { ViewPublishButton }
