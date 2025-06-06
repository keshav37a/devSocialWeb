import { SVGWrapper } from './SVGWrapper'

export const SingleTickIcon = ({ size = 20, ...restIconProps }) => (
    <SVGWrapper fill="none" height={size} strokeWidth="2" width={size} {...restIconProps}>
        <path d="M5 13l4 4L19 7" />
    </SVGWrapper>
)
