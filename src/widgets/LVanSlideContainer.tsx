import React, { PropsWithChildren } from 'react'
import {
    Swiper as SwiperClass,
    FreeMode,
    Mousewheel,
    Grid,
    EffectFade
} from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { GridOptions } from 'swiper/types'

import { classNames } from '@shared/utils'

import 'swiper/css/bundle'

interface ILVanSlideContainerInnerProps {
    perViews?: number | 'auto'
    effect?: 'fade' | 'slide'
    space?: number
    className?: string
    wrapperClassName?: string
    swiperClassName?: string
    noSwipingClassName?: string
    freeMode?: boolean
    mousewheel?: boolean
    grid?: GridOptions
    onInit?: (swiper: SwiperClass) => void
    onSlide?: (swiper: SwiperClass) => void
}

const LVanSlideContainerInner: React.FC<
    PropsWithChildren<ILVanSlideContainerInnerProps>
> = ({
    space,
    perViews,
    children,
    className,
    swiperClassName,
    wrapperClassName,
    noSwipingClassName,
    grid,
    freeMode,
    mousewheel,
    onSlide,
    onInit,
    effect
}) => {
    return (
        <div {...classNames('w-full', className)}>
            <Swiper
                {...classNames('h-full', swiperClassName)}
                wrapperClass={wrapperClassName}
                modules={[FreeMode, Mousewheel, Grid, EffectFade]}
                freeMode={freeMode}
                mousewheel={mousewheel}
                grid={grid}
                spaceBetween={space}
                slidesPerView={perViews}
                noSwipingClass={noSwipingClassName}
                onSlideChange={onSlide}
                effect={effect}
                onSwiper={onInit}>
                {children}
            </Swiper>
        </div>
    )
}

type ILVanSlideContainerInnerType = typeof LVanSlideContainerInner

interface ILVanSlideContainer extends ILVanSlideContainerInnerType {
    Content: typeof SwiperSlide
}

const LVanSlideContainer = LVanSlideContainerInner as ILVanSlideContainer
LVanSlideContainer.Content = SwiperSlide

export { LVanSlideContainer }
