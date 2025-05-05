import { useState } from 'react'

import { Button, Card, DatePicker, Dropdown, FileSelect, Input, TextArea } from '@CoreUI'

import { formatDate } from 'src/utils'

import { GENDER_OPTIONS } from 'src/constants'

export const UserProfileForm = ({
    cardProps,
    dpRef,
    isCenter,
    isSignUp,
    onChangeUser = () => {},
    onSubmit,
    onToggleSignIn: handleToggleSignIn = () => {},
    user,
}) => {
    const {
        firstName: existingFirstName,
        lastName: existingLastName,
        about: existingAbout,
        genderOptionsDisplay,
        gender: existingGender,
        photoUrl: existingPhotourl,
        updatedAt,
    } = user || {}
    const { formattedDate: existingDOB } = formatDate(user?.dob)

    const [firstName, setFirstName] = useState(existingFirstName ?? '')
    const [lastName, setLastName] = useState(existingLastName ?? '')
    const [email, setEmail] = useState('')
    const [about, setAbout] = useState(existingAbout ?? '')
    const [gender, setGender] = useState(existingGender ?? '')
    const [dob, setDob] = useState(existingDOB ?? '')
    const [profileImageFile, setProfileImageFile] = useState(null)
    const [password, setPassword] = useState(null)
    const [repeatPassword, setRepeatPassword] = useState(null)

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value)
        onChangeUser({ firstName: e.target.value })
    }
    const handleLastNameChange = (e) => {
        setLastName(e.target.value)
        onChangeUser({ lastName: e.target.value })
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
        onChangeUser({ email: e.target.value })
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
        onChangeUser({ password: e.target.value })
    }
    const handleRepeatPasswordChange = (e) => {
        setRepeatPassword(e.target.value)
    }
    const handleAboutChange = (e) => {
        setAbout(e.target.value)
        onChangeUser({ about: e.target.value })
    }
    const handleGenderChange = ({ value }) => {
        setGender(value)
        onChangeUser({ gender: value })
    }
    const handleDateChange = (date) => {
        setDob(date)
        onChangeUser({ dob: date })
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
        dpRef.current.src = existingPhotourl
        setProfileImageFile(null)
        onChangeUser({ photoUrlFile: null })
    }

    const isFormValid =
        firstName !== existingFirstName ||
        lastName !== existingLastName ||
        about !== existingAbout ||
        gender !== existingGender ||
        dob !== existingDOB ||
        profileImageFile

    const handleEditUserProfileForm = () => {
        const formData = new FormData()
        if (profileImageFile) {
            formData.append('profilePic', profileImageFile)
        }
        if (firstName !== existingFirstName) {
            formData.append('firstName', firstName)
        }
        if (lastName !== existingLastName) {
            formData.append('lastName', lastName)
        }
        if (about !== existingAbout) {
            formData.append('about', about)
        }
        if (gender !== existingGender) {
            formData.append('gender', gender)
        }
        if (dob !== existingDOB) {
            formData.append('dob', dob)
        }
        onSubmit?.(formData)
    }

    return (
        <Card cardProps={{ className: 'max-w-120', isAnimate: false }} isCenter={isCenter} {...cardProps}>
            <legend className="fieldset-legend font-medium">{isSignUp ? 'Sign up' : 'Update user profile'}</legend>
            <fieldset className="fieldset">
                <Input
                    labelProps={{ content: 'First name' }}
                    name="firstName"
                    onChange={handleFirstNameChange}
                    value={firstName}
                />
                <Input
                    labelProps={{ content: 'Last name' }}
                    name="lastName"
                    onChange={handleLastNameChange}
                    value={lastName}
                />
                {isSignUp ? (
                    <>
                        <Input
                            labelProps={{ content: 'Email' }}
                            name="email"
                            onChange={handleEmailChange}
                            value={email}
                        />
                        <Input
                            labelProps={{ content: 'Password' }}
                            name="password"
                            onChange={handlePasswordChange}
                            type="password"
                            value={password}
                        />
                        <Input
                            labelProps={{ content: 'Confirm password' }}
                            name="confirm-password"
                            onChange={handleRepeatPasswordChange}
                            type="password"
                            value={repeatPassword}
                        />
                    </>
                ) : null}
                <TextArea label={{ content: 'About' }} name="About" onChange={handleAboutChange} value={about} />
                <DatePicker
                    currentDate={existingDOB ? new Date(existingDOB) : new Date()}
                    onChange={handleDateChange}
                />
                <Dropdown
                    displayItemLabelKey="displayName"
                    initialSelectedValue={gender}
                    items={genderOptionsDisplay || GENDER_OPTIONS}
                    label={{ content: 'Gender' }}
                    onChange={handleGenderChange}
                    valueKey="value"
                />
                <FileSelect
                    accept="image/*"
                    btnProps={{ label: 'Select an image' }}
                    key={updatedAt}
                    name="profilePic"
                    onFileRemove={handleRemoveImage}
                    onFileSelect={handleSelectImage}
                />
                <Button className={'mt-4'} disabled={!isFormValid} label="Save" onClick={handleEditUserProfileForm} />
                {isSignUp ? (
                    <p className="mt-4 cursor-pointer text-center" onClick={handleToggleSignIn}>
                        Already have an account? Sign in
                    </p>
                ) : null}
            </fieldset>
        </Card>
    )
}
