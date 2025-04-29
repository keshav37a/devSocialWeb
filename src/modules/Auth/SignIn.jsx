import { useEffect, useState } from 'react'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'

import { Card, Input, Loading } from '@CoreUI'
import { Button } from '@CoreUI/Button'

import { signInUser } from '@Auth/authSlice'

import { useSignInMutation } from '@Auth/authApi'

export const SignIn = () => {
    const [email, setEmail] = useState('admin@gmail.com')
    const [password, setPassword] = useState('password')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChangeEmail = (e) => setEmail(e.target.value)
    const handleChangePassword = (e) => setPassword(e.target.value)

    const [handleSignIn, { isLoading: isSignInLoading, data: userSignInRequestData, error }] = useSignInMutation()
    const { data, status } = userSignInRequestData || {}
    const errorMessage = error?.data?.error?.message
    const statusCode = error?.data?.status?.statusCode

    useEffect(() => {
        /* TODO: Error handling pending */
        if (data?.user && status?.success) {
            dispatch(signInUser(data.user))
            navigate('/feed')
        }
    }, [data, dispatch, navigate, status])

    return (
        <Loading isLoading={isSignInLoading}>
            <Card isCenter className="mt-16">
                <fieldset className="fieldset w-xs">
                    <legend className="fieldset-legend">Login</legend>
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
                </fieldset>
            </Card>
        </Loading>
    )
}
