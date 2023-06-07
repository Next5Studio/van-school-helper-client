import React from 'react'
import { classNames } from '@shared/utils'
import { LVanAvatar } from '@widgets/LVanAvatar'

import { ViewChangeImages } from '../widgets/ViewChangeImages'
import { useNavigate } from 'react-router-dom'

interface ISecondChangeCardProps {
    className?: string
    content?: string
    previews?: Array<string>
    publisher?: {
        userId: string
        nickname: string
        avatar: string
        totalSoldCnt: number
    }
    sellingPrice?: number
    quality?: number
    product?: {
        brand: string
        model: string
        remark: string
    }
    changeId: string
}

const SecondChangeCard: React.FC<ISecondChangeCardProps> = ({
    content,
    previews = [],
    publisher,
    sellingPrice,
    quality,
    product,
    changeId,
    className
}) => {
    const navigate = useNavigate()

    const onCardClick = () => {
        navigate(`/goods?changeId=${changeId}`)
    }

    return (
        <div
            {...classNames('w-48 mt-4 rounded-xl', className)}
            onClick={onCardClick}>
            <div {...classNames('w-full h-48')}>
                <ViewChangeImages images={previews} />
            </div>
            <div {...classNames('mt-2 w-full flex-1', 'font-medium')}>
                <p className="line-clamp-2">
                    <span
                        {...classNames(
                            'inline-flex items-center',
                            'space-x-2 pr-2 mr-2',
                            'text-xs font-bold',
                            'border border-black rounded'
                        )}>
                        <span
                            {...classNames('py-1 px-2', 'bg-black text-white')}>
                            已查验
                        </span>
                        <span className="py-1">95新</span>
                    </span>
                    {content}
                </p>
                <div
                    {...classNames(
                        'flex items-center',
                        'space-x-1 mt-1',
                        'text-gray-500'
                    )}>
                    <div
                        {...classNames(
                            'text-xs border border-gray-500 rounded px-1'
                        )}>
                        7天无理由
                    </div>
                    <div
                        {...classNames(
                            'text-xs border border-gray-500 rounded px-1'
                        )}>
                        一年质保
                    </div>
                </div>
                <div {...classNames('flex items-center mt-2')}>
                    <div className="flex-1">
                        <span
                            {...classNames(
                                'self-end mb-1 mr-0.5',
                                'text-xs font-bold'
                            )}>
                            ￥
                        </span>
                        <span {...classNames('text-lg font-extrabold')}>
                            {sellingPrice}
                        </span>
                    </div>
                    <p {...classNames('text-xs text-gray-400 font-normal')}>
                        邮寄到付
                    </p>
                </div>
                <div {...classNames('flex items-center mt-2')}>
                    <LVanAvatar src={publisher?.avatar} size={1.25} />
                    <span {...classNames('font-bold text-sm ml-1')}>
                        {publisher?.nickname}
                    </span>
                </div>
            </div>
        </div>
    )
}

export { SecondChangeCard }
