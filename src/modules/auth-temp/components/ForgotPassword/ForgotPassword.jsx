/* eslint-disable react/jsx-handler-names */
import { useState } from 'react'

import { Card, Loading } from '@components'
import { Form, FORM_FIELD_TYPES } from '@components/Form'

import { useForgotPasswordMutation, useResetPasswordMutation } from 'src/modules/auth-temp/api/auth-api'

const enterEmailFormFields = [
    {
        id: 'email',
        name: 'email',
        type: FORM_FIELD_TYPES.EMAIL,
        labelProps: { content: 'Email' },
        placeholder: 'Enter your email',
        required: true,
        inputProps: {
            disabled: false,
        },
    },
]

const enterOTPFormFields = [
    {
        id: 'newPassword',
        name: 'newPassword',
        type: FORM_FIELD_TYPES.PASSWORD,
        labelProps: { content: 'New password' },
        placeholder: 'Enter your new password',
        required: true,
    },
    {
        id: 'confirmPassword',
        name: 'confirmPassword',
        type: FORM_FIELD_TYPES.PASSWORD,
        labelProps: { content: 'Confirm password' },
        placeholder: 'Confirm your new password',
        required: true,
    },
    {
        id: 'otp',
        name: 'otp',
        boxCount: 6,
        type: FORM_FIELD_TYPES.OTP,
        labelProps: { content: 'OTP' },
        placeholder: 'Enter your otp',
        required: true,
    },
]

const ForgotPassword = ({ onSignInToggle }) => {
    const [onForgotPassword, { isLoading: isForgotPasswordLoading, data: forgotPasswordData }] =
        useForgotPasswordMutation()
    const [onResetPassword, { isLoading: isResetPasswordLoading }] = useResetPasswordMutation()

    const isOTPSent = forgotPasswordData?.data?.otpSent

    const [formFields, setFormFields] = useState(enterEmailFormFields)

    const validations = {
        confirmPassword: (value, allValues) => (allValues['newPassword'] === value ? null : 'Passwords do not match'),
    }

    const handleForgotPassword = async (input) => {
        await onForgotPassword(input)
        const formFieldsUpdates = [...formFields]
        formFieldsUpdates[0].inputProps.disabled = true
        formFieldsUpdates.push(...enterOTPFormFields)
        setFormFields(formFieldsUpdates)
    }

    const handleSendOtp = async (value) => {
        const data = await onResetPassword(value)
        if (data?.data?.data?.passwordReset) {
            const formFieldsUpdates = [...formFields]
            formFieldsUpdates[0].inputProps.disabled = false
            setFormFields(formFieldsUpdates)
            onSignInToggle()
        }
    }

    return (
        <>
            <Loading isLoading={isForgotPasswordLoading || isResetPasswordLoading} />
            <Card isCenter cardProps={{ className: 'w-[60%] max-w-120', isAnimate: false }} className="mt-16">
                <Form
                    fields={formFields}
                    onSubmit={isOTPSent ? handleSendOtp : handleForgotPassword}
                    submitBtnProps={{ className: 'w-48', label: isOTPSent ? 'Reset password' : 'Enter OTP' }}
                    title={isOTPSent ? 'Reset password' : 'Send OTP'}
                    validations={validations}
                />
            </Card>
        </>
    )
}

export default ForgotPassword
