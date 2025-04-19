export const Card = ({ className = '', isCenter, children }) => {
    return (
        <div className={`${className} ${isCenter ? 'flex justify-center' : ''}`}>
            <div className="card w-96 bg-base-300 text-primary-content">
                <div className="card-body">{children}</div>
            </div>
        </div>
    )
}
