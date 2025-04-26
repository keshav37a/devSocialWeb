export const Button = ({ className, children, disabled, label, onClick }) => {
    const handleClick = (e) => onClick?.(e)

    return (
        <button className={`btn btn-neutral ${className}`} disabled={disabled} onClick={handleClick}>
            {children ? children : label ? label : 'Button'}
        </button>
    )
}
