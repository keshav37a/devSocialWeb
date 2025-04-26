import { useEffect, useState } from 'react'

import { useDispatch } from 'react-redux'

import { Button, Card, DatePicker, Dropdown, Input, TextArea } from '@CoreUI'

import { signInUser } from '@Auth/authSlice'
import { useEditUserProfileMutation } from 'services/apiSlice'

import { formatDate } from 'src/utils'

export const UserProfileForm = ({ isCenter, onChangeUser, user }) => {
    const dispatch = useDispatch()
    const {
        firstName: existingFirstName,
        lastName: existingLastName,
        about: existingAbout,
        genderOptionsDisplay,
        gender: existingGender,
    } = user || {}
    const { formattedDate: existingDOB } = formatDate(user?.dob)

    const [firstName, setFirstName] = useState(existingFirstName ?? '')
    const [lastName, setLastName] = useState(existingLastName ?? '')
    const [about, setAbout] = useState(existingAbout ?? '')
    const [gender, setGender] = useState(existingGender ?? '')
    const [dob, setDob] = useState(existingDOB ?? '')

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

    const isFormValid =
        firstName !== existingFirstName ||
        lastName !== existingLastName ||
        about !== existingAbout ||
        gender !== existingGender ||
        dob !== existingDOB

    const [handleEditUserProfile, { data: editedUserProfileData }] = useEditUserProfileMutation()
    const { data, status } = editedUserProfileData || {}

    useEffect(() => {
        if (data?.user && status?.statusCode === 200) {
            dispatch(signInUser(data.user))
        }
    }, [data, status, dispatch])

    return (
        <Card isCenter={isCenter}>
            <p className="text-center">Update user profile</p>
            <fieldset className="fieldset w-xs">
                <Input
                    label={{ content: 'First name' }}
                    name="firstName"
                    onChange={handleFirstNameChange}
                    value={firstName}
                />
                <Input
                    label={{ content: 'Last name' }}
                    name="lastName"
                    onChange={handleLastNameChange}
                    value={lastName}
                />
                <TextArea label={{ content: 'About' }} name="About" onChange={handleAboutChange} value={about} />
                <Dropdown
                    displayItemLabelKey="displayName"
                    initialSelectedValue={gender}
                    items={genderOptionsDisplay}
                    label={{ content: 'Gender' }}
                    onChange={handleGenderChange}
                />
                <DatePicker
                    currentDate={existingDOB ? new Date(existingDOB) : new Date()}
                    onDateChange={handleDateChange}
                />
                <Button
                    className={'mt-4'}
                    disabled={!isFormValid}
                    label="Save"
                    onClick={() => handleEditUserProfile({ firstName, lastName, about, gender, dob })}
                />
            </fieldset>
        </Card>
    )
}
