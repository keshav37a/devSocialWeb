export const Input = ({
    error,
    input,
    label,
    name = '',
    onChange,
    onClick,
    optional,
    placeholder = 'Enter a value',
    ref,
    type = 'text',
    value = '',
}) => {
    const { className: labelClassName = '', content: labelContent } = label || {}
    const { className: optionalClassName = '', content: optionalContent = 'Optional' } = optional || {}
    const { className: inputClassName = '' } = input || {}
    const { className: errorClassName = '', content: errorContent } = error || {}

    const handleChange = (e) => onChange?.(e)
    const handleClick = (e) => onClick?.(e)

    return (
        <fieldset className="fieldset">
            {label ? <label className={`fieldset-label ${labelClassName}`}>{labelContent}</label> : null}
            <input
                className={`input ${type === 'fileInput' ? 'file-input' : ''} ${inputClassName}`}
                name={name}
                onChange={handleChange}
                onClick={handleClick}
                placeholder={placeholder}
                ref={ref}
                type={type}
                value={value}
            />
            {optional ? <p className={`label ${optionalClassName}`}>{optionalContent}</p> : null}
            {error ? <span className={`text-red-400 ${errorClassName}`}>{errorContent}</span> : null}
        </fieldset>
    )
}
