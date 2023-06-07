import React, { PropsWithChildren, ReactNode } from 'react'

interface IViewFragmentProps {
    title: ReactNode
    className?: string
}

const ViewFragment: React.FC<PropsWithChildren<IViewFragmentProps>> = ({
    children,
    title,
    className
}) => {
    return (
        <div className={className}>
            <h1 className="font-extrabold text-3xl ml-5">{title}</h1>
            {children}
        </div>
    )
}

export { ViewFragment }
