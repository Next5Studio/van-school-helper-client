import {
    Lookup,
    SpringRef,
    useSpring,
    UseSpringProps,
    useSpringRef
} from '@react-spring/core'

const useAnimatedFragment = (
    initialStatement: Omit<UseSpringProps, 'ref'>
): [SpringRef<Lookup>, any] => {
    const animate = useSpringRef()
    const springs = useSpring({
        ref: animate,
        ...initialStatement
    })

    return [animate, springs]
}

export { useAnimatedFragment }
