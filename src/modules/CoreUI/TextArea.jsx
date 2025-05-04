import { twMerge } from 'tailwind-merge'

export const TextArea = ({ error, onChange, optional, label, name = '', textarea, type = 'text', value = '' }) => {
    const { className: labelClassName = '', content: labelContent } = label || {}
    const { className: optionalClassName = '', content: optionalContent = 'Optional' } = optional || {}
    const { className: textareaClassName = '' } = textarea || {}
    const { className: errorClassName = '', content: errorContent } = error || {}

    const handleChange = (e) => onChange?.(e)

    return (
        <fieldset className="fieldset">
            {label ? <label className={twMerge(`fieldset-label ${labelClassName}`)}>{labelContent}</label> : null}
            <textarea
                className={twMerge(`textarea h-24 w-full ${textareaClassName}`)}
                name={name}
                onChange={handleChange}
                placeholder="Type here"
                type={type}
                value={value}
            />
            {optional ? <p className={twMerge(`label ${optionalClassName}`)}>{optionalContent}</p> : null}
            {error ? <span className={twMerge(`text-red-400 ${errorClassName}`)}>{errorContent}</span> : null}
        </fieldset>
    )
}
