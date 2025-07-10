import { useState } from 'react'

import { ForgotPassword } from './ForgotPassword'
import { SignIn } from './SignIn'

import { SignUp } from './index'

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
