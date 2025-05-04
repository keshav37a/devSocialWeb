import { twMerge } from 'tailwind-merge'

export const Button = ({ className, children, disabled, label, onClick }) => {
    const handleClick = (e) => onClick?.(e)

    return (
        <button className={twMerge(`btn btn-neutral ${className}`)} disabled={disabled} onClick={handleClick}>
            {children ? children : label ? label : 'Button'}
        </button>
    )
}
