import React, { useEffect, useState } from 'react'
import { ArrowUp } from 'react-feather'

import { classNames } from '@shared/utils'

interface ILVanBackTopProps {
    className?: string
    target?: Array<HTMLElement | null>
}

const LVanBackTop: React.FC<ILVanBackTopProps> = ({
    className,
    target = [window]
}) => {
    const [visible, setVisible] = useState(false)

    const scrollToTop = () => {
        target.forEach((t) =>
            t?.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        )
    }

    const handleScroll = (e: Event) => {
        const scrollTop =
            (e.target as any).scrollTop || document.documentElement.scrollTop
        if (scrollTop > 300) {
            setVisible(true)
        } else {
            setVisible(false)
        }
    }

    useEffect(() => {
        target.forEach((t) => t?.addEventListener('scroll', handleScroll))

        return () =>
            target.forEach((t) =>
                t?.removeEventListener('scroll', handleScroll)
            )
    }, [target])

    return (
        <>
            {visible && (
                <div
                    {...classNames(
                        'fixed z-50 right-4 bottom-4 bg-white rounded-full p-3 shadow-xl border',
                        className
                    )}
                    onClick={scrollToTop}>
                    <ArrowUp size={18} />
                </div>
            )}
        </>
    )
}

export { LVanBackTop }
