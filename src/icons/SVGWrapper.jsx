export const SVGWrapper = ({
    children,
    className,
    fill = 'currentColor',
    height = 10,
    onClick: handleClick = () => {},
    stroke = 'currentColor',
    strokeLinecap = 'round',
    strokeLinejoin = 'round',
    strokeWidth = '1.5',
    viewBox = '0 0 24 24',
    width = 10,
    ...restIconProps
}) => (
    <svg
        className={className}
        fill={fill}
        height={height}
        onClick={handleClick}
        stroke={stroke}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
        strokeWidth={strokeWidth}
        viewBox={viewBox}
        width={width}
        xmlns="http://www.w3.org/2000/svg"
        {...restIconProps}
    >
        {children}
    </svg>
)
