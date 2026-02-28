import { lazy, useState } from 'react'

import { SuspenseWrapper } from '@components'

const ForgotPassword = lazy(() => import('src/modules/auth-temp/components/ForgotPassword/ForgotPassword'))
const SignIn = lazy(() => import('src/modules/auth-temp/components/SignIn/SignIn'))
const SignUp = lazy(() => import('src/modules/auth-temp/components/SignUp/SignUp'))

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
