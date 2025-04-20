export const TextArea = ({ error, onChange, optional, label, name = '', textarea, type = 'text', value = '' }) => {
    const { className: labelClassName = '', content: labelContent } = label || {}
    const { className: optionalClassName = '', content: optionalContent = 'Optional' } = optional || {}
    const { className: textareaClassName = '' } = textarea || {}
    const { className: errorClassName = '', content: errorContent } = error || {}

    const handleChange = (e) => onChange?.(e)

    return (
        <fieldset className="fieldset">
            {label ? <label className={`fieldset-label ${labelClassName}`}>{labelContent}</label> : null}
            <textarea
                className={`textarea h-24 ${textareaClassName}`}
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
