import { useState } from 'react'

import { SignIn } from './SignIn'

import { SignUp } from './index'

export const Auth = () => {
    const [showSignIn, setShowSignIn] = useState(true)

    const handleShowSignUp = () => setShowSignIn(false)
    const handleShowSignIn = () => setShowSignIn(true)

    return (
        <div>
            {showSignIn ? <SignIn onSignUpToggle={handleShowSignUp} /> : <SignUp onToggleSignIn={handleShowSignIn} />}
        </div>
    )
}
