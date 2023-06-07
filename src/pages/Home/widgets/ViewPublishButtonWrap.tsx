import React, {
    createContext,
    PropsWithChildren,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useState
} from 'react'
import { Plus, ChevronRight } from 'react-feather'
import {
    useChain,
    animated,
    useSpringRef,
    useTransition
} from '@react-spring/web'

import { useAnimatedFragment } from '@pages/Login/useAnimatedFragment'
import { classNames } from '@shared/utils'

interface PublishButtonConfig {
    title: ReactNode
    className?: string
    onClick?: () => void
}

const PublishButtonWrapContext = createContext({
    popButton: (button: PublishButtonConfig) => {},
    removeButton: (button: PublishButtonConfig) => {}
})

interface IViewPublishButtonWrapInnerProps {
    background?: string
}

const ViewPublishButtonWrapInner: React.FC<
    PropsWithChildren<IViewPublishButtonWrapInnerProps>
> = ({ background = 'white', children }) => {
    const [open, setOpen] = useState(false)
    const [buttons, setButtons] = useState<PublishButtonConfig[]>([])

    const [expendRef, expendStyle] = useAnimatedFragment({
        from: {
            position: 'absolute',
            height: '100%',
            width: '100%',
            size: 0,
            borderRadius: '50%',
            background: background,
            opacity: 0.75,
            scale: 0
        },
        to: {
            scale: open ? 100 : 0
        }
    })
    const transRef = useSpringRef()
    const transition = useTransition(open ? buttons : [], {
        ref: transRef,
        trail: 400 / buttons.length,
        from: { opacity: 0, scale: 0 },
        enter: { opacity: 1, scale: 1 },
        leave: { opacity: 0, scale: 0 }
    })

    useChain(open ? [expendRef, transRef] : [transRef, expendRef], [
        0,
        open ? 0.1 : 0.6
    ])

    const contextValue = useMemo(
        () => ({
            popButton: (button: PublishButtonConfig) => {
                const exist = buttons.find((btn) => btn.title === button.title)
                if (exist) {
                    throw new Error('Can not pop button with same title.')
                }
                setButtons((prev) => [...prev, button])
            },
            removeButton: (button: PublishButtonConfig) => {
                setButtons(buttons.filter((btn) => btn.title !== button.title))
            }
        }),
        []
    )

    return (
        <PublishButtonWrapContext.Provider value={contextValue}>
            <div className="relative">
                <animated.span style={expendStyle} />
                <ul className="absolute z-20 right-0 bottom-14 space-y-4">
                    {children}
                    {transition((style, button) => (
                        <animated.li
                            style={style}
                            onClick={button.onClick}
                            {...classNames(
                                'whitespace-nowrap py-6 px-4 rounded-xl flex',
                                button.className
                            )}>
                            {button.title}
                            <ChevronRight className="ml-16" />
                        </animated.li>
                    ))}
                </ul>
                <div
                    className="relative p-1 rounded-full bg-slate-500 z-20"
                    onClick={() => setOpen(!open)}>
                    <Plus
                        size={18}
                        color="#fff"
                        {...classNames(
                            'transition duration-150 ease-in-out transform rotate-0',
                            {
                                'rotate-45': open
                            }
                        )}
                    />
                </div>
            </div>
        </PublishButtonWrapContext.Provider>
    )
}

type IPublishButtonInnerProps = Omit<PublishButtonConfig, 'title'>

const PublishButtonInner: React.FC<
    PropsWithChildren<IPublishButtonInnerProps>
> = ({ children, onClick, className }) => {
    const { popButton, removeButton } = useContext(PublishButtonWrapContext)

    useEffect(() => {
        const button = {
            title: children,
            onClick,
            className
        }
        popButton(button)
        return () => removeButton(button)
    }, [])

    return null
}

type ViewPublishButtonWrapInnerType = typeof ViewPublishButtonWrapInner

interface ViewPublishButtonWrapType extends ViewPublishButtonWrapInnerType {
    PublishButton: typeof PublishButtonInner
}

const ViewPublishButtonWrap =
    ViewPublishButtonWrapInner as ViewPublishButtonWrapType
ViewPublishButtonWrap.PublishButton = PublishButtonInner

export { ViewPublishButtonWrap }
