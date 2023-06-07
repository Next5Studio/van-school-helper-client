import React, { useRef } from 'react'

export const useMultipleRefHandler = <TRefInstance>(
    refs: React.RefObject<TRefInstance>[]
) => {
    const currentIndex = useRef(0)

    return {
        index: currentIndex.current,
        next() {
            currentIndex.current += 1
        },
        get instance() {
            return refs[currentIndex.current]?.current
        }
    }
}
