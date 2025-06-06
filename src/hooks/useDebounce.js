import { useEffect, useRef } from 'react'

export const useDebounce = ({ callback, delay }) => {
    const timeoutRef = useRef()

    const debouncedFunction = (...args) => {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => {
            callback(...args)
        }, delay)
    }

    useEffect(() => {
        return () => clearTimeout(timeoutRef.current)
    }, [])

    return debouncedFunction
}
