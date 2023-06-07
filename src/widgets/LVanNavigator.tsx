import React, {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react'
import { classNames, typeOf } from '@shared/utils'
import { Types } from '@shared/types'

interface ILVanNavigatorInnerProps {
    className?: string
    defaultNavigatorKey: string
    onMeasure?: (data?: DOMRect) => void
    onNavigatorChange?: (currNavigatorKey: string) => void
}

const LVanNavigatorContext = createContext<{
    currNavigatorKey: string
    setCurrNavigatorKey: React.Dispatch<React.SetStateAction<string>>
}>(null as any)

const LVanNavigatorInner: React.FC<
    PropsWithChildren<ILVanNavigatorInnerProps>
> = ({
    children,
    className,
    defaultNavigatorKey,
    onMeasure,
    onNavigatorChange
}) => {
    const firstTraggleRef = useRef(true)
    const containerRef = useRef<HTMLDivElement>(null)
    const [currNavigatorKey, setCurrNavigatorKey] =
        useState(defaultNavigatorKey)

    useEffect(() => {
        onMeasure?.(containerRef.current?.getBoundingClientRect())
    }, [])

    const currNavigator = useMemo(
        () => ({
            currNavigatorKey,
            setCurrNavigatorKey
        }),
        [currNavigatorKey, setCurrNavigatorKey]
    )

    useEffect(() => {
        if (firstTraggleRef.current) {
            firstTraggleRef.current = false
            return
        }
        onNavigatorChange?.(currNavigatorKey)
    }, [currNavigatorKey])

    return (
        <LVanNavigatorContext.Provider value={currNavigator}>
            <div
                {...classNames('flex justify-around items-center', className)}
                ref={containerRef}>
                {children}
            </div>
        </LVanNavigatorContext.Provider>
    )
}

interface ILVanNavigatorItemInnerProps {
    className?: string
    navigatorKey: string
}

const LVanNavigatorItemInner: React.FC<
    PropsWithChildren<ILVanNavigatorItemInnerProps>
> = ({ children, navigatorKey, className }) => {
    const { currNavigatorKey, setCurrNavigatorKey } =
        useContext(LVanNavigatorContext)

    const isActive = useMemo(
        () => currNavigatorKey === navigatorKey,
        [currNavigatorKey, navigatorKey]
    )

    return (
        <span
            {...classNames(className)}
            onClick={() => setCurrNavigatorKey(navigatorKey)}>
            {typeOf(children) === Types.Function
                ? (children as any)(isActive)
                : children}
        </span>
    )
}

type ILVanNavigatorInnerTypes = typeof LVanNavigatorInner
interface ILVanNavigator extends ILVanNavigatorInnerTypes {
    Item: typeof LVanNavigatorItemInner
}

const LVanNavigator = LVanNavigatorInner as ILVanNavigator
LVanNavigator.Item = LVanNavigatorItemInner

export { LVanNavigator }
