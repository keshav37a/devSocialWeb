import { useEffect } from 'react'

import { useNavigate } from 'react-router'

import { Card, Loading } from '@CoreUI'
import { Form } from '@CoreUI/Form'
import { FORM_FIELD_TYPES } from '@CoreUI/Form/constants'

import { useSignInMutation } from '@Auth/authApi'

export const SignIn = ({ onSignUpToggle: handleSignUpToggle, onForgotPasswordToggle: handleForgotPasswordToggle }) => {
    const navigate = useNavigate()

    const [handleSignIn, { isLoading: isSignInLoading, data: userSignInRequestData, error }] = useSignInMutation()
    const { data, status } = userSignInRequestData || {}
    const errorMessage = error?.data?.error?.message

    useEffect(() => {
        if (data?.user && status?.success) {
            navigate('/feed')
        }
    }, [data, navigate, status])

    return (
        <>
            <Loading isLoading={isSignInLoading} />
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
