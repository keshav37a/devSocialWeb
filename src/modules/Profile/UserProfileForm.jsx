import { useState } from 'react'

import { Card } from '@CoreUI'
import { Form } from '@CoreUI/Form'
import { FORM_FIELD_TYPES } from '@CoreUI/Form/constants'

import { formatDate } from 'src/utils'

import { GENDER_OPTIONS } from 'src/constants'

export const UserProfileForm = ({ cardProps, dpRef, isCenter, onChangeUser, onSubmit, user }) => {
    const [isFormChanged, setIsFormChanged] = useState(false)
    const [profileImageFile, setProfileImageFile] = useState(null)

    const getFormattedDate = (date) => () => {
        const { formattedDate } = formatDate(date)
        return formattedDate
    }

    const handleChangeFields = (_, updatedValues) => {
        let isFormChanged = false
        Object.keys(updatedValues).forEach((key) => {
            if (user[key] !== updatedValues[key] && key !== 'dob') {
                isFormChanged = true
            } else if (key === 'dob') {
                if (user['formattedDob'] !== getFormattedDate(updatedValues['dob'])()) {
                    isFormChanged = true
                }
            }
        })
        onChangeUser?.(updatedValues)
        setIsFormChanged(isFormChanged)
    }

    const fieldChangeCallbacks = {
        gender: (genderData) => genderData.value,
        dob: (date) => {
            const { formattedDate } = formatDate(date)
            return formattedDate
        },
    }

    const handleSelectImage = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        onChangeUser({ photoUrlFile: file })
        setProfileImageFile(file)
        reader.onload = (e) => {
            const imgResult = e.target.result
            dpRef.current.src = imgResult
        }
    }
    const handleRemoveImage = () => {
        dpRef.current.src = user?.photoUrl
        setProfileImageFile(null)
        onChangeUser({ photoUrlFile: null })
    }

    const handleEditUserProfileForm = (updatedUserData = {}) => {
        const formData = new FormData()
        const { firstName, lastName, about, gender, dob } = updatedUserData
        if (profileImageFile) {
            formData.append('profilePic', profileImageFile)
        }
        if (firstName !== user?.firstName) {
            formData.append('firstName', firstName)
        }
        if (lastName !== user?.lastName) {
            formData.append('lastName', lastName)
        }
        if (about !== user?.about) {
            formData.append('about', about)
        }
        if (gender !== user?.gender) {
            formData.append('gender', gender)
        }
        if (dob !== user?.formattedDate) {
            formData.append('dob', dob)
        }
        onSubmit?.(formData)
    }

    return (
        <Card cardProps={{ className: 'max-w-120', isAnimate: false }} isCenter={isCenter} {...cardProps}>
            <Form
                fieldChangeCallbacks={fieldChangeCallbacks}
                fields={[
                    {
                        id: 'firstName',
                        labelProps: { content: 'First name' },
                        name: 'firstName',
                        placeholder: 'Update your first name',
                        required: true,
                        type: FORM_FIELD_TYPES.INPUT,
                    },
                    {
                        id: 'lastName',
                        labelProps: { content: 'Last name' },
                        name: 'lastName',
                        placeholder: 'Update your last name',
                        required: true,
                        type: FORM_FIELD_TYPES.INPUT,
                    },
                    {
                        id: 'dob',
                        name: 'dob',
                        labelProps: { content: 'Date of birth' },
                        required: true,
                        currentDate: getFormattedDate(user?.dob),
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
                    {
                        btnProps: { label: 'Update your profile picture' },
                        id: 'profilePic',
                        name: 'profilePic',
                        onFileRemove: handleRemoveImage,
                        onFileSelect: handleSelectImage,
                        ref: dpRef,
                        type: FORM_FIELD_TYPES.FILE_SELECT,
                    },
                ]}
                initialValues={user}
                onFieldChange={handleChangeFields}
                onSubmit={handleEditUserProfileForm}
                submitBtnProps={{ label: 'Update', disabled: !isFormChanged && !profileImageFile }}
            />
        </Card>
    )
}
