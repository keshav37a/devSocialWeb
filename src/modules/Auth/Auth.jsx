import { useState } from 'react'

import { ForgotPassword, SignIn, SignUp } from '@Auth'

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
                <ForgotPassword onSignInToggle={handleShowSignIn} />
            ) : showSignIn ? (
                <SignIn onForgotPasswordToggle={handleShowForgotPassword} onSignUpToggle={handleShowSignUp} />
            ) : (
                <SignUp onSignInToggle={handleShowSignIn} />
            )}
        </div>
    )
}
