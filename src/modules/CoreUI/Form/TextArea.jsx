import { twMerge } from 'tailwind-merge'

export const TextArea = ({
    error,
    id,
    label,
    name = '',
    onChange,
    placeholder = 'Type here',
    textarea,
    value = '',
}) => {
    const { className: labelClassName = '', content: labelContent } = label || {}
    const { className: textareaClassName = '' } = textarea || {}
    const { className: errorClassName = '', content: errorContent } = error || {}

    const handleChange = (e) => onChange?.(e)

    return (
        <fieldset className="fieldset">
            {label ? <label className={twMerge(`fieldset-label ${labelClassName}`)}>{labelContent}</label> : null}
            <textarea
                className={twMerge(`textarea h-24 w-full ${textareaClassName}`)}
                id={id}
                name={name}
                onChange={handleChange}
                placeholder={placeholder}
                value={value}
            />
            {error ? <span className={twMerge(`text-red-400 ${errorClassName}`)}>{errorContent}</span> : null}
        </fieldset>
    )
}
