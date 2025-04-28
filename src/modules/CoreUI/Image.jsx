import { twMerge } from 'tailwind-merge'

export const Image = ({ src, alt = '', className = '', captionProps, imgProps }) => {
    const { className: captionClassName = '', captionContent = '' } = captionProps || {}
    const { className: imgClassName = '', ...restImgProps } = imgProps || {}

    return (
        <figure className={twMerge(`flex flex-col items-center ${className}`)}>
            <img
                alt={alt}
                className={twMerge(`h-full w-full rounded-xl object-cover shadow-md ${imgClassName}`)}
                src={src}
                {...restImgProps}
            />
            {captionContent ? (
                <figcaption className={twMerge(`mt-2 text-sm text-gray-500 ${captionClassName}`)}>
                    {captionContent}
                </figcaption>
            ) : null}
        </figure>
    )
}
