import { twMerge } from 'tailwind-merge'

export const Label = ({ className = '', content, htmlFor = '' }) => (
    <label className={twMerge(`fieldset-label ${className}`)} htmlFor={htmlFor}>
        {content}
    </label>
)
