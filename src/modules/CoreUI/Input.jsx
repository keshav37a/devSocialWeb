export const Input = ({ error, onChange, optional, label, name = '', input, type = 'text', value = '' }) => {
    const { className: labelClassName = '', content: labelContent } = label || {}
    const { className: optionalClassName = '', content: optionalContent = 'Optional' } = optional || {}
    const { className: inputClassName = '' } = input || {}
    const { className: errorClassName = '', content: errorContent } = error || {}

    const handleChange = (e) => onChange?.(e)

    return (
        <fieldset className="fieldset">
            {label ? <label className={`fieldset-label ${labelClassName}`}>{labelContent}</label> : null}
            <input
                className={`input ${inputClassName}`}
                name={name}
                onChange={handleChange}
                placeholder="Type here"
                type={type}
                value={value}
            />
            {optional ? <p className={`label ${optionalClassName}`}>{optionalContent}</p> : null}
            {error ? <span className={`text-red-400 ${errorClassName}`}>{errorContent}</span> : null}
        </fieldset>
    )
}
