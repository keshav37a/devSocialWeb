import { useEffect, useState } from 'react'

import { useDispatch } from 'react-redux'

import { Button, Card, DatePicker, Dropdown, FileSelect, Input, Loading, TextArea } from '@CoreUI'

import { signInUser } from '@Auth/authSlice'

import { useEditUserProfileMutation } from '@Profile/userProfileApi'

import { formatDate } from 'src/utils'

export const UserProfileForm = ({ dpRef, isCenter, onChangeUser, user }) => {
    const dispatch = useDispatch()
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
    const [about, setAbout] = useState(existingAbout ?? '')
    const [gender, setGender] = useState(existingGender ?? '')
    const [dob, setDob] = useState(existingDOB ?? '')
    const [profileImageFile, setProfileImageFile] = useState(null)

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value)
        onChangeUser({ firstName: e.target.value })
    }
    const handleLastNameChange = (e) => {
        setLastName(e.target.value)
        onChangeUser({ lastName: e.target.value })
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

    const [handleEditUserProfile, { data: editedUserProfileData, isLoading }] = useEditUserProfileMutation()
    const { data, status } = editedUserProfileData || {}

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
        handleEditUserProfile(formData)
    }

    useEffect(() => {
        if (data?.user && status?.statusCode === 200) {
            dispatch(signInUser(data.user))
            setProfileImageFile(null)
            dpRef.current.src = data?.user?.photoUrl
        }
    }, [dpRef, data?.user, status, dispatch])

    return (
        <>
            <Loading isLoading={isLoading} />
            <Card isCenter={isCenter}>
                <p className="text-center">Update user profile</p>
                <fieldset className="fieldset w-xs">
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
                    <TextArea label={{ content: 'About' }} name="About" onChange={handleAboutChange} value={about} />
                    <DatePicker
                        currentDate={existingDOB ? new Date(existingDOB) : new Date()}
                        onDateChange={handleDateChange}
                    />
                    <Dropdown
                        displayItemLabelKey="displayName"
                        initialSelectedValue={gender}
                        items={genderOptionsDisplay}
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
                    <Button
                        className={'mt-4'}
                        disabled={!isFormValid}
                        label="Save"
                        onClick={handleEditUserProfileForm}
                    />
                </fieldset>
            </Card>
        </>
    )
}
