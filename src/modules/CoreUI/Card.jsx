import { twMerge } from 'tailwind-merge'

export const Card = ({ containerProps, cardProps, cardBodyProps, isCenter, children }) => {
    const { className: containerClassName = '' } = containerProps || {}
    const { className: cardClassName = '', isAnimate = true } = cardProps || {}
    const { className: cardBodyClassName = '' } = cardBodyProps || {}
    return (
        <div
            className={twMerge(
                `card-container ${containerClassName} ${isCenter ? 'flex items-center justify-center' : ''}`
            )}
        >
            <div
                className={twMerge(
                    `card h-full w-full bg-base-300 text-primary-content ${isAnimate ? 'transition-transform duration-300 hover:scale-105 hover:shadow-lg' : ''} ${cardClassName}`
                )}
            >
                <div className={twMerge(`card-body ${cardBodyClassName}`)}>{children}</div>
            </div>
        </div>
    )
}
