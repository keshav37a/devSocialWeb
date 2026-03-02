import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { resetToast } from '@layout/api/layout-slice'

import { TOAST_TYPES } from './constants'

export const Toast = ({ children }) => {
    const dispatch = useDispatch()
    const { toast } = useSelector((state) => state.coreUI) || {}
    const { time = 3000, content, type = TOAST_TYPES.SUCCESS, error } = toast || {}
    const [animateClose, setAnimateClose] = useState(false)

    const errorMessage = error
        ? ((error?.error || error?.data?.message || error?.data?.error?.message || error?.message) ??
          'Something went wrong')
        : null

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
            {content || errorMessage ? (
                <div className="toast toast-center toast-top z-100">
                    <div
                        className={`alert transform transition-all duration-500 ${animateClose ? 'translate-x-150 opacity-0' : 'translate-x-0 opacity-100'} ${type === TOAST_TYPES.ERROR || error ? 'bg-rose-500' : type === TOAST_TYPES.INFO ? 'bg-sky-400' : type === TOAST_TYPES.SUCCESS ? 'bg-emerald-400' : 'bg-sky-400'} `}
                    >
                        <span>{error ? errorMessage : content}</span>
                    </div>
                </div>
            ) : null}
            {children}
        </>
    )
}

export default Toast
