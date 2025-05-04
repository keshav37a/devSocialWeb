import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router'

import { Card, Input, Loading } from '@CoreUI'
import { Button } from '@CoreUI/Button'

import { useSignInMutation } from '@Auth/authApi'

export const SignIn = ({ onSignUpToggle: handleSignUpToggle }) => {
    const [email, setEmail] = useState('admin@gmail.com')
    const [password, setPassword] = useState('password')
    const navigate = useNavigate()

    const handleChangeEmail = (e) => setEmail(e.target.value)
    const handleChangePassword = (e) => setPassword(e.target.value)

    const [handleSignIn, { isLoading: isSignInLoading, data: userSignInRequestData, error }] = useSignInMutation()
    const { data, status } = userSignInRequestData || {}
    const errorMessage = error?.data?.error?.message
    const statusCode = error?.data?.status?.statusCode

    useEffect(() => {
        if (data?.user && status?.success) {
            navigate('/feed')
        }
    }, [data, navigate, status])

    return (
        <Loading isLoading={isSignInLoading}>
            <Card isCenter cardProps={{ className: 'w-[60%] max-w-120', isAnimate: false }} className="mt-16">
                <fieldset className="fieldset">
                    <legend className="fieldset-legend font-medium">Login</legend>
                    <Input
                        labelProps={{ content: 'Email' }}
                        onChange={handleChangeEmail}
                        placeholder="Email"
                        type="email"
                        value={email}
                    />
                    <Input
                        errorProps={
                            (errorMessage && statusCode === 400) || statusCode === 404
                                ? { content: errorMessage }
                                : null
                        }
                        labelProps={{ content: 'Password' }}
                        onChange={handleChangePassword}
                        placeholder="Password"
                        type="password"
                        value={password}
                    />
                    <Button
                        className="mt-4"
                        disabled={!email || !password}
                        onClick={() => handleSignIn({ email, password })}
                    >
                        Login
                    </Button>
                    <p className="mt-4 cursor-pointer text-center" onClick={handleSignUpToggle}>
                        {"Don't have an account? Sign up"}
                    </p>
                </fieldset>
            </Card>
        </Loading>
    )
}
