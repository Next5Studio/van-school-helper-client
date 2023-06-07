import React, { useMemo, useState } from 'react'
import { LVanPage } from '@widgets/LVanPage'
import { LVanHeader } from '@widgets/LVanHeader'
import { LVanBack } from '@widgets/LVanBack'
import { LVanSlideContainer } from '@widgets/LVanSlideContainer'

import { mock } from './mock'
import { classNames } from '@shared/utils'
import { ViewCommunicate } from './widgets/ViewCommunicate'
import { ViewTipsCard } from './widgets/ViewTipsCard'
import { LVanAvatar } from '@widgets/LVanAvatar'
import { LVanSize } from '@widgets/types'
import { ViewMore } from '@pages/Home/widgets/ViewMore'

function Goods() {
    const [{ previews, sellingPrice, quality, content, equities, publisher }] =
        useState(mock)

    const qualityPercent = useMemo(() => quality * 100, [quality])

    const onViewMore = () => {}

    return (
        <LVanPage backTop>
            <div className="relative z-10">
                <LVanHeader className="absolute z-20 !bg-transparent">
                    <LVanBack className="text-white" />
                    <p className="text-white">商品详情</p>
                </LVanHeader>
                <LVanSlideContainer className="h-96 z-10" effect="fade">
                    {previews.map((preview, index) => {
                        return (
                            <LVanSlideContainer.Content key={preview}>
                                <img
                                    className="h-full w-full object-cover brightness-75"
                                    src={preview}
                                    alt={`photo_${index + 1}`}
                                />
                            </LVanSlideContainer.Content>
                        )
                    })}
                </LVanSlideContainer>
                <div className="absolute bottom-0 w-full px-4 z-20 flex items-center mb-2">
                    <LVanAvatar
                        className="border-4 border-white"
                        size={LVanSize.Large}
                        src={publisher.avatar}
                        alt={publisher.nickname}
                    />
                    <div className="ml-2 flex-1 text-white">
                        <p className="font-bold">{publisher.nickname}</p>
                        <p className="text-xs -mt-0.5">
                            {publisher?.education?.college} ·{' '}
                            {publisher?.education?.clz}
                        </p>
                    </div>
                    <ViewMore
                        className="text-white"
                        direction="vertical"
                        onViewMore={onViewMore}
                    />
                </div>
            </div>
            <div className="flex-1 py-4 px-3 bg-gray-100 space-y-4 pb-20">
                {/* 价格卡片 */}
                <div className="bg-white shadow-lg p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                        <p className="text-red-500">
                            ￥
                            <span className="text-3xl font-bold">
                                {sellingPrice}
                            </span>
                        </p>
                        <div className="font-bold">
                            <span className="text-xl">{qualityPercent}</span>
                            成新
                        </div>
                    </div>
                    {/* 权益列表 */}
                    <div
                        {...classNames(
                            'flex items-center',
                            'space-x-1 mt-1',
                            'text-gray-500'
                        )}>
                        {equities.map((equity) => {
                            return (
                                <div
                                    key={equity.title}
                                    {...classNames(
                                        'text-xs border border-gray-500 rounded px-1'
                                    )}>
                                    {equity.title}
                                </div>
                            )
                        })}
                    </div>
                    <p className="mt-2">{content}</p>
                </div>
                <ViewTipsCard
                    title="温馨提示"
                    items={[
                        {
                            title: '商品所有权及发票',
                            content:
                                '该商品由入驻平台的用户销售，平台法人主体非该商品销售主体，平台法人主体无法为你开具该商品的销售发票，相关发票应由实际销售方开具。'
                        }
                    ]}
                />
                <ViewTipsCard
                    title="退换流程"
                    items={[
                        {
                            title: '质量问题退换货',
                            content:
                                '若签收7天内发现质量问题，请当日联系我们在线客服，提供照片或视频，客服确定商品有质量问题之后安排客户退回，待仓库收到商品并确认有质量问题后，在线客服联系客户申请退款，并补偿客户寄回商品产生的运费。'
                        },
                        {
                            title: '非质量问题退换货',
                            content:
                                '商品签收7天内支持无理由退换货，退回费用需客户自理，并补商家发货产生的费用，签收超过7天后不支持退货退款，质保180天期间可维修。'
                        },
                        {
                            title: '7天无理由退换货',
                            content:
                                '自签收之日起7天内申请、在保证商品完好无损，包装齐全，不影响二次销售的情况下，可退换货，退回运费买家自理，并补商家发货产生的费用。'
                        },
                        {
                            title: '运损问题',
                            content:
                                '客户需当快递员面验货再签收，如有运损，请务必拍照留证（包装破损图、商品破损图、面单图），并拒收处理，如签收运损件产生损失客户自行承担。'
                        }
                    ]}
                />
            </div>
            <ViewCommunicate></ViewCommunicate>
        </LVanPage>
    )
}

export { Goods }
