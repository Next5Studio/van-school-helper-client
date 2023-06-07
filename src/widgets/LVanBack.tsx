import React, { PropsWithChildren, ReactNode } from 'react'
import { Icon, ChevronLeft } from 'react-feather'
import { classNames } from '@shared/utils'
import { To, useNavigate, NavigateOptions } from 'react-router-dom'

interface ILVanBackProps {
    Icon?: Icon
    className?: string
    title?: ReactNode
    hrefOrDelta?: To | number
    options?: NavigateOptions
}

const LVanBack: React.FC<PropsWithChildren<ILVanBackProps>> = ({
    Icon = ChevronLeft,
    hrefOrDelta = -1,

    className,
    title,
    options
}) => {
    const navigate = useNavigate()

    const onBtnGoBackClicked = () => {
        navigate(hrefOrDelta as any, options)
    }

    return (
        <div {...classNames('flex items-center', className)}>
            <Icon size={24} onClick={onBtnGoBackClicked} />
            {title}
        </div>
    )
}

export { LVanBack }
