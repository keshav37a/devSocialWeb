import { twMerge } from 'tailwind-merge'

export const Button = ({
    className,
    children,
    disabled,
    isCenter,
    isFullRounded,
    isFullWidth,
    label,
    onClick,
    ref,
    type = 'button',
}) => {
    const handleClick = (e) => onClick?.(e)

    return (
        <div className={`btn-container flex ${isCenter ? 'justify-center' : ''}`}>
            <button
                className={twMerge(
                    `btn btn-neutral ${isFullWidth ? 'w-full' : ''} ${isFullRounded ? 'rounded-full' : ''} ${className}`
                )}
                disabled={disabled}
                onClick={handleClick}
                ref={ref}
                type={type}
            >
                {children ? children : label ? label : 'Button'}
            </button>
        </div>
    )
}

export default Button
