export const Input = ({
    errorProps,
    inputProps,
    labelProps,
    name = '',
    onChange,
    onClick,
    optionalProps,
    placeholder = 'Enter a value',
    ref,
    type = 'text',
    value = '',
}) => {
    const { className: labelClassName = '', content: labelContent } = labelProps || {}
    const { className: optionalClassName = '', content: optionalContent = 'Optional' } = optionalProps || {}
    const { className: inputClassName = '' } = inputProps || {}
    const { className: errorClassName = '', content: errorContent } = errorProps || {}

    const handleChange = (e) => onChange?.(e)
    const handleClick = (e) => onClick?.(e)

    return (
        <fieldset className="fieldset">
            {labelProps ? <label className={`fieldset-label ${labelClassName}`}>{labelContent}</label> : null}
            <input
                className={`input ${type === 'fileInput' ? 'file-input' : ''} ${inputClassName}`}
                name={name}
                onChange={handleChange}
                onClick={handleClick}
                placeholder={placeholder}
                ref={ref}
                type={type}
                value={value}
                {...inputProps}
            />
            {optionalProps ? <p className={`label ${optionalClassName}`}>{optionalContent}</p> : null}
            {errorProps ? <span className={`text-red-400 ${errorClassName}`}>{errorContent}</span> : null}
        </fieldset>
    )
}
