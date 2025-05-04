import { useEffect } from 'react'

import { useNavigate } from 'react-router'

import { Card, Loading } from '@CoreUI'
import { Form } from '@CoreUI/Form'

import { useSignInMutation } from '@Auth/authApi'

export const SignIn = ({ onSignUpToggle: handleSignUpToggle }) => {
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
                <h3>Sign in</h3>
                <Form
                    fields={[
                        {
                            id: 'email',
                            name: 'email',
                            type: 'email',
                            labelProps: { content: 'Email' },
                            placeholder: 'Enter your email',
                            required: true,
                            errorProps: { content: errorMessage?.includes('User') ? errorMessage : null },
                        },
                        {
                            id: 'password',
                            name: 'password',
                            type: 'password',
                            labelProps: { content: 'Password' },
                            placeholder: 'Enter your password',
                            required: true,
                            errorProps: { content: errorMessage?.includes('password') ? errorMessage : null },
                        },
                    ]}
                    onSubmit={handleSignIn}
                    submitBtnProps={{ className: 'w-48', label: 'Sign in' }}
                />
                <p className="mt-2 cursor-pointer text-center" onClick={handleSignUpToggle}>
                    {"Don't have an account? Sign up"}
                </p>
            </Card>
        </>
    )
}
