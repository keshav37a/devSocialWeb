import { useEffect } from 'react'

import { useNavigate } from 'react-router'

import { useSignUpMutation } from './authApi'

import { Card, Loading } from '@CoreUI'
import { Form } from '@CoreUI/Form'

import { GENDER_OPTIONS } from 'src/constants'

const signUpFormFields = [
    {
        id: 'firstName',
        labelProps: { content: 'First name' },
        name: 'firstName',
        placeholder: 'Enter your first name',
        required: true,
    },
    {
        id: 'lastName',
        labelProps: { content: 'Last name' },
        name: 'lastName',
        placeholder: 'Enter your last name',
        required: true,
    },
    {
        id: 'email',
        labelProps: { content: 'Email' },
        name: 'email',
        placeholder: 'example@email.com',
        required: true,
        type: 'email',
    },
    {
        id: 'password',
        labelProps: { content: 'Password' },
        name: 'password',
        placeholder: 'Enter your password',
        required: true,
        type: 'password',
    },
    {
        id: 'confirmPassword',
        labelProps: { content: 'Confirm password' },
        name: 'confirmPassword',
        placeholder: 'Confirm password',
        required: true,
        type: 'password',
    },
    {
        id: 'dob',
        name: 'dob',
        type: 'datePicker',
        labelProps: { content: 'Date of birth' },
        required: true,
    },
    {
        id: 'about',
        labelProps: { content: 'About' },
        name: 'about',
        placeholder: 'Write a few lines about yourself',
        required: true,
        type: 'textArea',
    },
    {
        id: 'gender',
        name: 'gender',
        type: 'dropdown',
        labelProps: { content: 'Gender' },
        displayItemLabelKey: 'displayName',
        items: GENDER_OPTIONS,
        valueKey: 'value',
        required: true,
    },
]

export const SignUp = ({ onToggleSignIn: handleToggleSignIn }) => {
    const [handleSignUp, { isLoading: isSignUpLoading, data: userSignUpRequestData }] = useSignUpMutation()
    const { data, status } = userSignUpRequestData || {}

    const navigate = useNavigate()

    const handleSignUpHelper = (userData) => {
        const { confirmPassword: _, ...restUser } = userData
        handleSignUp(restUser)
    }

    const validations = {
        confirmPassword: (value, allValues) => (allValues['password'] === value ? true : 'Passwords do not match'),
    }

    const fieldChangeCallbacks = {
        gender: (genderData) => genderData.value,
    }

    useEffect(() => {
        if (data?.user && status?.success) {
            handleToggleSignIn?.()
        }
    }, [data, navigate, status, handleToggleSignIn])

    return (
        <>
            <Loading isLoading={isSignUpLoading} />
            <Card isCenter cardProps={{ className: 'w-[60%] max-w-120', isAnimate: false }} className="mt-16">
                <h3>Sign up</h3>
                <Form
                    fieldChangeCallbacks={fieldChangeCallbacks}
                    fields={signUpFormFields}
                    onSubmit={handleSignUpHelper}
                    submitBtnProps={{ className: 'w-48', label: 'Sign up' }}
                    validations={validations}
                />
            </Card>
        </>
    )
}
