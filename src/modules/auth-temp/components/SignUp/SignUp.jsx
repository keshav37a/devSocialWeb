import { useEffect } from 'react'

import { useNavigate } from 'react-router'

import { Card, Loading } from '@components'
import { Form, FORM_FIELD_TYPES } from '@components/Form'

import { useSignUpMutation } from 'src/modules/auth-temp/api/auth-api'

import { GENDER_OPTIONS } from 'src/constants'

const signUpFormFields = [
    {
        id: 'firstName',
        labelProps: { content: 'First name' },
        name: 'firstName',
        placeholder: 'Enter your first name',
        required: true,
        type: FORM_FIELD_TYPES.TEXT,
    },
    {
        id: 'lastName',
        labelProps: { content: 'Last name' },
        name: 'lastName',
        placeholder: 'Enter your last name',
        required: true,
        type: FORM_FIELD_TYPES.TEXT,
    },
    {
        id: 'email',
        labelProps: { content: 'Email' },
        name: 'email',
        placeholder: 'example@email.com',
        required: true,
        type: FORM_FIELD_TYPES.EMAIL,
    },
    {
        id: 'password',
        labelProps: { content: 'Password' },
        name: 'password',
        placeholder: 'Enter your password',
        required: true,
        type: FORM_FIELD_TYPES.PASSWORD,
    },
    {
        id: 'confirmPassword',
        labelProps: { content: 'Confirm password' },
        name: 'confirmPassword',
        placeholder: 'Confirm password',
        required: true,
        type: FORM_FIELD_TYPES.PASSWORD,
    },
    {
        id: 'dob',
        name: 'dob',
        labelProps: { content: 'Date of birth' },
        required: true,
        type: FORM_FIELD_TYPES.DATEPICKER,
    },
    {
        id: 'about',
        labelProps: { content: 'About' },
        name: 'about',
        placeholder: 'Write a few lines about yourself',
        required: true,
        type: FORM_FIELD_TYPES.TEXTAREA,
    },
    {
        id: 'gender',
        name: 'gender',
        labelProps: { content: 'Gender' },
        displayItemLabelKey: 'displayName',
        items: GENDER_OPTIONS,
        valueKey: 'value',
        required: true,
        type: FORM_FIELD_TYPES.DROPDOWN,
    },
]

export const SignUp = ({ onSignInToggle: handleSignInToggle }) => {
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
            handleSignInToggle?.()
        }
    }, [data, navigate, status, handleSignInToggle])

    return (
        <>
            <Loading isLoading={isSignUpLoading} />
            <Card isCenter cardProps={{ className: 'w-[60%] max-w-120', isAnimate: false }} className="mt-16">
                <Form
                    fieldChangeCallbacks={fieldChangeCallbacks}
                    fields={signUpFormFields}
                    onSubmit={handleSignUpHelper}
                    submitBtnProps={{ className: 'w-48', label: 'Sign up' }}
                    title="Sign up"
                    validations={validations}
                />
                <p className="mt-4 cursor-pointer text-center" onClick={handleSignInToggle}>
                    Already have an account? Sign in
                </p>
            </Card>
        </>
    )
}

export default SignUp
