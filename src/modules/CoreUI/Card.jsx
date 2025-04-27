export const Card = ({ containerProps, cardProps, cardBodyProps, isCenter, children }) => {
    const { className: containerClassName = '' } = containerProps || {}
    const { className: cardClassName = '' } = cardProps || {}
    const { className: cardBodyClassName = '' } = cardBodyProps || {}
    return (
        <div className={`card-container ${containerClassName} ${isCenter ? 'flex items-center justify-center' : ''}`}>
            <div className={`card bg-base-300 text-primary-content ${cardClassName}`}>
                <div className={`card-body ${cardBodyClassName}`}>{children}</div>
            </div>
        </div>
    )
}
