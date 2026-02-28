import { useEffect } from 'react'

import { useGoogleLogin } from '@react-oauth/google'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

import { Button, Card, Loading } from '@components'
import { Form, FORM_FIELD_TYPES } from '@components/Form'

import { GoogleIcon } from 'icons'

import { useSignInGoogleMutation, useSignInMutation } from '@auth/api/auth-api'

export const SignIn = ({ onSignUpToggle: handleSignUpToggle, onForgotPasswordToggle: handleForgotPasswordToggle }) => {
    const navigate = useNavigate()

    const [handleSignIn, { isLoading: isSignInLoading, error }] = useSignInMutation()
    const [onSignInGoogle, { isLoading: isSignInGoogleLoading }] = useSignInGoogleMutation()

    const errorMessage = error?.data?.error?.message

    const user = useSelector((state) => state.auth.user)

    const handleSignInGoogleHelper = (signInData) => onSignInGoogle({ token: signInData.code })

    const handleSignInGoogle = useGoogleLogin({
        onSuccess: handleSignInGoogleHelper,
        flow: 'auth-code',
    })

    useEffect(() => {
        if (user) {
            navigate('/feed')
        }
    }, [user, navigate])

    return (
        <>
            <Loading isLoading={isSignInLoading || isSignInGoogleLoading} />
            <Card isCenter cardProps={{ className: 'w-[60%] max-w-120', isAnimate: false }} className="mt-16">
                <Form
                    fields={[
                        {
                            id: 'email',
                            name: 'email',
                            type: FORM_FIELD_TYPES.EMAIL,
                            labelProps: { content: 'Email' },
                            placeholder: 'Enter your email',
                            required: true,
                            errorProps: { content: errorMessage?.includes('User') ? errorMessage : null },
                        },
                        {
                            id: 'password',
                            name: 'password',
                            type: FORM_FIELD_TYPES.PASSWORD,
                            labelProps: { content: 'Password' },
                            placeholder: 'Enter your password',
                            required: true,
                            errorProps: { content: errorMessage?.includes('password') ? errorMessage : null },
                        },
                    ]}
                    onSubmit={handleSignIn}
                    submitBtnProps={{ className: 'w-48', label: 'Sign in' }}
                    title="Sign in"
                />
                <Button isFullRounded isFullWidth onClick={handleSignInGoogle}>
                    <GoogleIcon />
                    <p>Sign in with Google</p>
                </Button>
                <div className="mt-1 text-center">
                    <span className="cursor-pointer" onClick={handleSignUpToggle}>
                        {"Don't have an account? Sign up"}
                    </span>
                </div>
                <div className="text-center">
                    <span className="cursor-pointer" onClick={handleForgotPasswordToggle}>
                        {'Forgot password?'}
                    </span>
                </div>
            </Card>
        </>
    )
}

export default SignIn
