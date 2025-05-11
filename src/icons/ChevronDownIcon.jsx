import { SVGWrapper } from 'icons/SVGWrapper'

export const ChevronDownIcon = ({ size = 10, ...restIconProps }) => (
    <SVGWrapper height={size} strokeWidth="0.5" width={size} {...restIconProps}>
        <path
            clipRule="evenodd"
            d="M12 14.25a.75.75 0 0 1-.53-.22l-5.25-5.25a.75.75 0 1 1 1.06-1.06L12 12.44l4.72-4.72a.75.75 0 0 1 1.06 1.06l-5.25 5.25a.75.75 0 0 1-.53.22z"
            fillRule="evenodd"
        />
    </SVGWrapper>
)
