import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router'

import { useSignUpMutation } from './authApi'

import { Loading } from '@CoreUI/Loading'
import { UserProfileForm } from '@Profile/UserProfileForm'

export const SignUp = ({ onToggleSignIn: handleToggleSignIn }) => {
    const [handleSignUp, { isLoading: isSignUpLoading, data: userSignUpRequestData }] = useSignUpMutation()
    const { data, status } = userSignUpRequestData || {}
    const [userData, setUserData] = useState({})

    const navigate = useNavigate()

    const handleChangeUser = (fieldData) => {
        setUserData((prev) => ({ ...prev, ...fieldData }))
    }

    const handleSignUpHelper = () => handleSignUp(userData)

    useEffect(() => {
        if (data?.user && status?.success) {
            handleToggleSignIn?.()
        }
    }, [data, navigate, status, handleToggleSignIn])

    return (
        <>
            <Loading isLoading={isSignUpLoading} />
            <UserProfileForm
                isCenter
                isSignUp
                onChangeUser={handleChangeUser}
                onSubmit={handleSignUpHelper}
                onToggleSignIn={handleToggleSignIn}
            />
        </>
    )
}
