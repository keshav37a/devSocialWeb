import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { resetToast } from '@CoreUI/coreUISlice'

export const Toast = ({ children }) => {
    const dispatch = useDispatch()
    const { toast } = useSelector((state) => state.coreUI) || {}
    const { time = 4000, content, type = 'success' } = toast || {}
    const [animateClose, setAnimateClose] = useState(false)

    useEffect(() => {
        let timeoutId1 = Date.now()
        let timeoutId2 = Date.now()
        if (toast) {
            timeoutId1 = setTimeout(() => setAnimateClose(true), [time])
            timeoutId2 = setTimeout(() => {
                setAnimateClose(false)
                dispatch(resetToast())
            }, [time + 500])
        }
        return () => {
            clearTimeout(timeoutId1)
            clearTimeout(timeoutId2)
        }
    }, [toast, time, dispatch])

    return (
        <>
            {content ? (
                <div className="toast-top toast-center toast">
                    <div
                        className={`alert transform transition-all duration-500 ${animateClose ? 'translate-x-150 opacity-0' : 'translate-x-0 opacity-100'} ${type === 'success' ? 'bg-emerald-400' : type === 'info' ? 'bg-sky-400' : type === 'error' ? 'bg-rose-500' : 'bg-sky-400'} `}
                    >
                        <span>{content}</span>
                    </div>
                </div>
            ) : null}
            {children}
        </>
    )
}
