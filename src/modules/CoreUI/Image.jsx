export const Image = ({ src, alt = '', className = '', captionProps, imgProps }) => {
    const { className: captionClassName = '', captionContent = '' } = captionProps || {}
    const { className: imgClassName = '' } = imgProps || {}
    return (
        <figure className={`flex flex-col items-center ${className}`}>
            <img alt={alt} className={`rounded-xl shadow-md ${imgClassName}`} src={src} {...imgProps} />
            {captionContent ? (
                <figcaption className={`mt-2 text-sm text-gray-500 ${captionClassName}`}>{captionContent}</figcaption>
            ) : null}
        </figure>
    )
}
