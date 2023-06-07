import React from 'react'
import { LVanSlideContainer } from '@widgets/LVanSlideContainer'
import { classNames } from '@shared/utils'

interface IViewChangeImagesProps {
    images: Array<string>
}

const ViewChangeImages: React.FC<IViewChangeImagesProps> = ({ images }) => {
    return (
        <LVanSlideContainer
            effect="fade"
            {...classNames('h-full rounded-xl overflow-hidden')}>
            {images.map((image) => (
                <LVanSlideContainer.Content key={image}>
                    <img
                        {...classNames('w-full h-full object-cover')}
                        src={image}
                        alt={image}
                    />
                </LVanSlideContainer.Content>
            ))}
        </LVanSlideContainer>
    )
}

export { ViewChangeImages }
