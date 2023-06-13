import React, { useState } from 'react'
import { MoreHorizontal } from 'react-feather'
import { classNames } from '@shared/utils'

interface IViewMoreProps {
    onViewMore?: () => void
    direction?: 'horizontal' | 'vertical'
    className?: string
    menuItems?: Array<{
        title: string
        className?: string
    }>
}

const ViewMore: React.FC<IViewMoreProps> = ({
    onViewMore,
    direction = 'horizontal',
    className,
    menuItems = []
}) => {
    const [show, setShow] = useState(false)

    const onBtnMoreClick = () => {
        if (!onViewMore) {
            setShow(!show)
            return
        }
        onViewMore?.()
    }

    return (
        <span className="relative">
            <MoreHorizontal
                {...classNames(
                    {
                        'rotate-90': direction === 'vertical'
                    },
                    className
                )}
                size={24}
                onClick={onBtnMoreClick}
            />
            <ul
                {...classNames(
                    'absolute right-0 translate-y-3 bg-white shadow-lg rounded-md px-4 py-2 border',
                    {
                        hidden: !show,
                        'flex flex-col': show
                    }
                )}>
                {menuItems.map((menu) => {
                    const { title, className: menuClass, ...rest } = menu
                    return (
                        <li
                            key={title}
                            {...rest}
                            {...classNames(
                                'py-2 whitespace-nowrap',
                                menuClass
                            )}>
                            {title}
                        </li>
                    )
                })}
            </ul>
        </span>
    )
}

export { ViewMore }
