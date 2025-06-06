import { SVGWrapper } from './SVGWrapper'

export const DoubleTickIcon = ({ size = 20, ...restIconProps }) => (
    <SVGWrapper fill="none" height={size} strokeWidth="2" viewBox="0 0 32 32" width={size} {...restIconProps}>
        <path d="M5 16l5 5L20 8" />
        <path d="M12 16l5 5L27 8" />
    </SVGWrapper>
)
