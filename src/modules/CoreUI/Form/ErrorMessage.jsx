import { twMerge } from 'tailwind-merge'

export const ErrorMessage = ({ className, content }) => (
    <div className={twMerge(`text-red-400 ${className}`)}>{content}</div>
)
