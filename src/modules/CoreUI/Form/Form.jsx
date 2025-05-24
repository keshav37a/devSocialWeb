import { useState } from 'react'

import { Button, DatePicker, Dropdown, ErrorMessage, FileSelect, Input, Label, TextArea } from '@CoreUI/Form'
import { FORM_FIELD_TYPES, INPUT_FIELD_TYPES } from '@CoreUI/Form/constants'

export const Form = ({
    className = '',
    fields = [],
    fieldChangeCallbacks,
    initialValues = {},
    onSubmit,
    onFieldChange,
    submitBtnProps = {},
    title,
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

    const handleFieldChange = (name) => (eventOrValue) => {
        let newValue = null
        if (typeof fieldChangeCallbacks?.[name] === 'function') {
            newValue = fieldChangeCallbacks?.[name](eventOrValue)
        } else if (typeof eventOrValue?.target?.value === 'string' || typeof eventOrValue?.target?.value === 'number') {
            newValue = eventOrValue?.target?.value
        } else {
            newValue = eventOrValue
        }
        const updatedValues = { ...values, [name]: newValue }
        onFieldChange?.({ [name]: newValue }, updatedValues)
        setValues((prev) => ({ ...prev, [name]: newValue }))
    }

    return (
        <form className={`form ${className}`} onSubmit={handleSubmit}>
            {title ? <h3>{title}</h3> : null}
            {fields.map(
                ({
                    className = '',
                    errorProps,
                    id,
                    labelProps,
                    name,
                    noError = true,
                    type = 'text',
                    ...restInputProps
                }) => {
                    const restProps = { id, name, type, onChange: handleFieldChange(name), value: values[name] ?? '' }
                    const { content: errorContent, className: errorClassName, ...restErrorProps } = errorProps || {}
                    return (
                        <div className={`field-unit my-1 ${className}`} key={id}>
                            {labelProps ? <Label className="mb-2" htmlFor={id} {...labelProps} /> : null}
                            {INPUT_FIELD_TYPES.includes(type) ? (
                                <Input {...restProps} {...restInputProps} />
                            ) : type === FORM_FIELD_TYPES.TEXTAREA ? (
                                <TextArea {...restProps} {...restInputProps} />
                            ) : type === FORM_FIELD_TYPES.DROPDOWN ? (
                                <Dropdown {...restProps} {...restInputProps} />
                            ) : type === FORM_FIELD_TYPES.DATEPICKER ? (
                                <DatePicker {...restProps} {...restInputProps} />
                            ) : type === FORM_FIELD_TYPES.FILE_SELECT ? (
                                <FileSelect onFileSelect={handleFieldChange(name)} {...restProps} {...restInputProps} />
                            ) : null}
                            {!noError && (
                                <div className="mt-1 h-5">
                                    {errorContent || errorMessageData[name] ? (
                                        <ErrorMessage
                                            className={errorClassName}
                                            content={errorContent || errorMessageData[name]}
                                            {...restErrorProps}
                                        />
                                    ) : null}
                                </div>
                            )}
                        </div>
                    )
                }
            )}
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
