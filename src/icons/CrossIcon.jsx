import { SVGWrapper } from 'icons/SVGWrapper'

export const CrossIcon = ({ strokeWidth = '2.5', size = 10, ...restIconProps }) => (
    <SVGWrapper height={size} strokeWidth={strokeWidth} width={size} {...restIconProps}>
        <line x1="18" x2="6" y1="6" y2="18" />
        <line x1="6" x2="18" y1="6" y2="18" />
    </SVGWrapper>
)
