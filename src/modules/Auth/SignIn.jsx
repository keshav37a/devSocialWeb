import { useEffect, useState } from 'react'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'

import { Card, Loading } from '@CoreUI'

import { useSignInMutation } from 'services'
import { signInUser } from './authSlice'

export const SignIn = () => {
    const [email, setEmail] = useState('admin@gmail.com')
    const [password, setPassword] = useState('password')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChangeEmail = (e) => setEmail(e.target.value)
    const handleChangePassword = (e) => setPassword(e.target.value)

    const [handleSignIn, { isLoading: isSignInLoading, data: userSignInRequestData }] = useSignInMutation()
    const { data, status } = userSignInRequestData || {}

    useEffect(() => {
        /* TODO: Error handling pending */
        if (data?.user && status?.success) {
            dispatch(signInUser(data.user))
            navigate('/feed')
        }
    }, [data, dispatch, navigate, status])

    return (
        <>
            {isSignInLoading ? <Loading /> : null}
            <Card isCenter className="mt-16">
                <fieldset className="fieldset w-xs">
                    <legend className="fieldset-legend">Login</legend>
                    <label className="fieldset-label">Email</label>
                    <input
                        className="input"
                        onChange={handleChangeEmail}
                        placeholder="Email"
                        type="email"
                        value={email}
                    />
                    <label className="fieldset-label">Password</label>
                    <input
                        className="input"
                        onChange={handleChangePassword}
                        placeholder="Password"
                        type="password"
                        value={password}
                    />
                    <button
                        className="btn mt-4 btn-neutral"
                        disabled={!email || !password}
                        onClick={() => handleSignIn({ email, password })}
                    >
                        Login
                    </button>
                </fieldset>
            </Card>
        </>
    )
}
