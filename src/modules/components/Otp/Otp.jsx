/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useMemo, useRef, useState } from 'react'

import { twMerge } from 'tailwind-merge'

export const Otp = ({
    errorProps,
    id = null,
    boxCount = 4,
    inputProps,
    labelProps,
    onChange,
    onClick,
    inputType = 'number',
    gap = 2,
}) => {
    const [boxValues, setBoxValues] = useState([])
    const inputRefs = useRef([])
    inputRefs.current = useMemo(
        () => Array.from({ length: boxCount }).map((_, i) => inputRefs.current[i] ?? React.createRef()),
        [boxCount]
    )
    const { className: labelClassName = '', content: labelContent } = labelProps || {}
    const { className: inputClassName = '' } = inputProps || {}
    const { className: errorClassName = '', content: errorContent } = errorProps || {}

    const handleChange = (index) => (e) => {
        if (index < boxCount - 1 && e.target.value !== '') {
            inputRefs.current[index + 1]?.current?.focus()
        }
        if (index > 0 && e.target.value === '') {
            inputRefs.current[index - 1]?.current?.focus()
        }
        setBoxValues((prevValue) => {
            const value = e.target.value
            const lastChar = value[value.length - 1]
            if (prevValue[index] || prevValue[index] === '') {
                prevValue[index] = lastChar
            } else {
                prevValue.push(lastChar)
            }
            let newValues = [...prevValue]
            newValues = newValues.map((val) => val ?? '')

            return newValues
        })
    }

    useEffect(() => {
        onChange?.(boxValues?.join(''))
    }, [boxValues])

    const handleClick = (index) => (e) => onClick?.(boxValues, e, index)

    return (
        <>
            {labelProps ? <label className={twMerge(`fieldset-label ${labelClassName}`)}>{labelContent}</label> : null}
            <div className="otp-container flex">
                {Array.from({ length: boxCount }).map((_, index) => (
                    <input
                        className={twMerge(
                            `input w-12 focus:outline-none mr-${gap} [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${inputClassName}`
                        )}
                        id={`${id}-${index}`}
                        key={`${id}-${index}`}
                        maxLength={1}
                        onChange={handleChange(index)}
                        onClick={handleClick(index)}
                        ref={inputRefs.current[index]}
                        type={inputType}
                        value={boxValues[index] ?? ''}
                        {...inputProps}
                    />
                ))}
            </div>
            {errorProps ? <span className={twMerge(`text-red-400 ${errorClassName}`)}>{errorContent}</span> : null}
        </>
    )
}

export default Otp
