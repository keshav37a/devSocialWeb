import { useCallback, useEffect } from 'react'

export const useOutsideClick = (refs = [], onOutsideClick) => {
    const handleClick = useCallback(
        (e) => {
            let isOutsideClick = true
            refs.forEach((ref) => {
                if (ref.current && ref.current.contains(e.target)) {
                    isOutsideClick = false
                }
            })

            if (isOutsideClick) {
                onOutsideClick?.()
            }
        },
        [refs, onOutsideClick]
    )

    useEffect(() => {
        const isRefsPresent = refs && refs.length > 0
        if (isRefsPresent) {
            window.addEventListener('click', handleClick)
        }
        return () => (isRefsPresent ? window.removeEventListener('click', handleClick) : null)
    }, [handleClick, refs])
}
