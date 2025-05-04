import { twMerge } from 'tailwind-merge'

export const Button = ({ className, children, disabled, label, onClick, isFullWidth, isCenter = true }) => {
    const handleClick = (e) => onClick?.(e)

    return (
        <div className={`btn-container flex ${isCenter ? 'justify-center' : ''}`}>
            <button
                className={twMerge(`btn btn-neutral ${isFullWidth ? 'w-full' : ''} ${className}`)}
                disabled={disabled}
                onClick={handleClick}
            >
                {children ? children : label ? label : 'Button'}
            </button>
        </div>
    )
}
