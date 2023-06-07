import { EffectCallback, useEffect, useRef } from 'react'

export const useVisualViewportEffect = (
    effect: EffectCallback,
    distance: number
) => {
    const callbackResultRef = useRef<any>()

    useEffect(() => {
        const listener = () => {
            const isEffect =
                window.screen.height - distance >
                (window.visualViewport?.height ?? 0)
            if (isEffect) {
                callbackResultRef.current = effect()
            } else {
                callbackResultRef.current?.()
            }
        }

        window.visualViewport?.addEventListener('resize', listener)
        return () =>
            window.visualViewport?.removeEventListener('resize', listener)
    }, [distance, effect])
}
