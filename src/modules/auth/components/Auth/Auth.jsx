import { lazy, useState } from 'react'

import { SuspenseWrapper } from '@components'

const ForgotPassword = lazy(() => import('@auth/components/ForgotPassword'))
const SignIn = lazy(() => import('@auth/components/SignIn'))
const SignUp = lazy(() => import('@auth/components/SignUp'))

export const Auth = () => {
    const [showSignIn, setShowSignIn] = useState(true)
    const [showForgotPassword, setShowForgotPassword] = useState(false)

    const handleShowSignUp = () => {
        setShowForgotPassword(false)
        setShowSignIn(false)
    }
    const handleShowSignIn = () => {
        setShowForgotPassword(false)
        setShowSignIn(true)
    }
    const handleShowForgotPassword = () => {
        setShowForgotPassword(true)
    }

    return (
        <div>
            {showForgotPassword ? (
                <SuspenseWrapper>
                    <ForgotPassword onSignInToggle={handleShowSignIn} />
                </SuspenseWrapper>
            ) : showSignIn ? (
                <SuspenseWrapper>
                    <SignIn onForgotPasswordToggle={handleShowForgotPassword} onSignUpToggle={handleShowSignUp} />
                </SuspenseWrapper>
            ) : (
                <SuspenseWrapper>
                    <SignUp onSignInToggle={handleShowSignIn} />
                </SuspenseWrapper>
            )}
        </div>
    )
}

export default Auth
