import React from 'react'
import { MoreHorizontal } from 'react-feather'
import { classNames } from '@shared/utils'

interface IViewMoreProps {
    onViewMore: () => void
    direction?: 'horizontal' | 'vertical'
    className?: string
}

const ViewMore: React.FC<IViewMoreProps> = ({
    onViewMore,
    direction = 'horizontal',
    className
}) => {
    return (
        <MoreHorizontal
            {...classNames(
                {
                    'rotate-90': direction === 'vertical'
                },
                className
            )}
            size={24}
            onClick={onViewMore}
        />
    )
}

export { ViewMore }
