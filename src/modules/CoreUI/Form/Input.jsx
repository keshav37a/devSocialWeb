import { twMerge } from 'tailwind-merge'

export const Input = ({
    errorProps,
    id = null,
    inputProps,
    labelProps,
    name = '',
    onChange,
    onClick,
    placeholder = 'Enter a value',
    ref,
    type = 'text',
    value = '',
}) => {
    const { className: labelClassName = '', content: labelContent } = labelProps || {}
    const { className: inputClassName = '' } = inputProps || {}
    const { className: errorClassName = '', content: errorContent } = errorProps || {}

    const handleChange = (e) => onChange?.(e)
    const handleClick = (e) => onClick?.(e)

    return (
        <>
            {labelProps ? <label className={twMerge(`fieldset-label ${labelClassName}`)}>{labelContent}</label> : null}
            <input
                className={twMerge(`input w-full ${type === 'fileInput' ? 'file-input' : ''} ${inputClassName}`)}
                id={id}
                name={name}
                onChange={handleChange}
                onClick={handleClick}
                placeholder={placeholder}
                ref={ref}
                type={type}
                value={value ?? ''}
                {...inputProps}
            />
            {errorProps ? <span className={twMerge(`text-red-400 ${errorClassName}`)}>{errorContent}</span> : null}
        </>
    )
}
