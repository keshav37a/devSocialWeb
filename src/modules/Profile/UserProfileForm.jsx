import { useEffect, useState } from 'react'

import { useDispatch } from 'react-redux'

import { Button, Card, Input } from '@CoreUI'
import { TextArea } from '@CoreUI/TextArea'

import { signInUser } from '@Auth/authSlice'
import { useEditUserProfileMutation } from 'services/apiSlice'

export const UserProfileForm = ({ isCenter, user }) => {
    const dispatch = useDispatch()
    const { firstName: existingFirstName, lastName: existingLastName, about: existingAbout } = user || {}

    const [firstName, setFirstName] = useState(existingFirstName ?? '')
    const [lastName, setLastName] = useState(existingLastName ?? '')
    const [about, setAbout] = useState(existingAbout ?? '')

    const handleFirstNameChange = (e) => setFirstName(e.target.value)
    const handleLastNameChange = (e) => setLastName(e.target.value)
    const handleAboutChange = (e) => setAbout(e.target.value)

    const isFormValid = firstName !== existingFirstName || lastName !== existingLastName || about !== existingAbout

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
                <Button
                    className={'mt-4'}
                    disabled={!isFormValid}
                    label="Save"
                    onClick={() => handleEditUserProfile({ firstName, lastName, about })}
                />
            </fieldset>
        </Card>
    )
}
