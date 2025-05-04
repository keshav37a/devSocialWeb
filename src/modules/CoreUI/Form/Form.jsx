import { useState } from 'react'

import { Button, Input } from '@CoreUI'
import { ErrorMessage, Label } from '@CoreUI/Form'
import { INPUT_FIELD_TYPES } from '@CoreUI/Form/constants'

export const Form = ({ fields = [], submitBtnProps = {}, onSubmit }) => {
    const [values, setValues] = useState({})
    const { className: btnClassName, isFullWidth = true, ...restSubmitBtnProps } = submitBtnProps
    const isFormDisabled = !fields.every(({ required, name }) => (required ? !!values[name] : true))

    const handleSubmit = (e) => {
        onSubmit?.(values)
        e.preventDefault()
    }

    const handleFieldChange = (name) => (event) => setValues((prev) => ({ ...prev, [name]: event.target.value }))

    return (
        <form onSubmit={handleSubmit}>
            {fields.map(({ className = '', id, errorProps, labelProps, name, type, ...restInputProps }) => {
                const { content: errorContent, className: errorClassName, ...restErrorProps } = errorProps || {}
                return (
                    <div className={`field-unit relative my-1 ${className}`} key={id}>
                        {labelProps ? <Label className="mb-2" htmlFor={id} {...labelProps} /> : null}
                        {INPUT_FIELD_TYPES.includes(type) ? (
                            <Input
                                id={id}
                                name={name}
                                onChange={handleFieldChange(name)}
                                type={type}
                                value={values[name]}
                                {...restInputProps}
                            />
                        ) : null}
                        <div className="mt-1 h-5">
                            {errorContent ? (
                                <ErrorMessage className={errorClassName} content={errorContent} {...restErrorProps} />
                            ) : null}
                        </div>
                    </div>
                )
            })}
            <Button
                isCenter
                className={`my-1 ${btnClassName}`}
                disabled={isFormDisabled}
                isFullWidth={isFullWidth}
                {...restSubmitBtnProps}
            />
        </form>
    )
}
