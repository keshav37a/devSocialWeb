import { useState } from 'react'

import { Button, DatePicker, Dropdown, Input, TextArea } from '@CoreUI'
import { FileSelect } from '@CoreUI/FileSelect'
import { ErrorMessage, Label } from '@CoreUI/Form'
import { INPUT_FIELD_TYPES } from '@CoreUI/Form/constants'

export const Form = ({
    fields = [],
    fieldChangeCallbacks,
    initialValues = {},
    onSubmit,
    submitBtnProps = {},
    validations = {},
}) => {
    const [values, setValues] = useState(initialValues)
    const [errorMessageData, setErrorMessageData] = useState({})

    const {
        className: submitBtnClassName,
        isFullWidth = true,
        type: submitBtnType = 'submit',
        ...restSubmitBtnProps
    } = submitBtnProps
    const isFormDisabled = !fields.every(({ required, name }) => (required ? !!values[name] : true))

    const handleSubmit = (e) => {
        e.preventDefault()
        const errorMessageData = {}
        for (const [key, value] of Object.entries(values)) {
            const rule = validations[key]
            if (rule && rule(value, values)) {
                errorMessageData[key] = rule(value, values)
            } else {
                errorMessageData[key] = null
            }
        }
        setErrorMessageData(errorMessageData)
        onSubmit?.(values)
    }

    const handleFieldChange = (name) => (eventOrValue) =>
        setValues((prev) => {
            const newState = { ...prev }
            if (typeof fieldChangeCallbacks?.[name] === 'function') {
                newState[name] = fieldChangeCallbacks?.[name](eventOrValue)
            } else if (typeof eventOrValue?.target?.value === 'string') {
                newState[name] = eventOrValue?.target?.value
            } else {
                newState[name] = eventOrValue
            }
            return newState
        })

    return (
        <form onSubmit={handleSubmit}>
            {fields.map(({ className = '', errorProps, id, labelProps, name, type = 'text', ...restInputProps }) => {
                const restProps = { id, name, type, onChange: handleFieldChange(name), value: values[name] ?? '' }
                const { content: errorContent, className: errorClassName, ...restErrorProps } = errorProps || {}
                return (
                    <div className={`field-unit my-1 ${className}`} key={id}>
                        {labelProps ? <Label className="mb-2" htmlFor={id} {...labelProps} /> : null}
                        {INPUT_FIELD_TYPES.includes(type) ? (
                            <Input {...restProps} {...restInputProps} />
                        ) : type === 'textArea' ? (
                            <TextArea {...restProps} {...restInputProps} />
                        ) : type === 'dropdown' ? (
                            <Dropdown {...restProps} {...restInputProps} />
                        ) : type === 'datePicker' ? (
                            <DatePicker {...restProps} {...restInputProps} />
                        ) : type === 'fileSelect' ? (
                            <FileSelect onFileSelect={handleFieldChange(name)} {...restProps} {...restInputProps} />
                        ) : null}
                        <div className="mt-1 h-5">
                            {errorContent || errorMessageData[name] ? (
                                <ErrorMessage
                                    className={errorClassName}
                                    content={errorContent || errorMessageData[name]}
                                    {...restErrorProps}
                                />
                            ) : null}
                        </div>
                    </div>
                )
            })}
            <Button
                isCenter
                className={`my-1 ${submitBtnClassName}`}
                disabled={isFormDisabled}
                isFullWidth={isFullWidth}
                type={submitBtnType}
                {...restSubmitBtnProps}
            />
        </form>
    )
}
