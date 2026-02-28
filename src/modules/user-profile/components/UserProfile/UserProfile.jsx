import { useEffect, useMemo, useRef, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Loading } from '@components'
import { UserCard } from '@feed/components'
import { UserProfileForm } from '@user-profile/components'

import { signInUser } from '@auth/api/auth-slice'
import { useEditUserProfileMutation } from '@user-profile/api/user-profile-api'

import { calculateAge } from 'src/utils'

export const UserProfile = () => {
    const { user } = useSelector((state) => state.auth)
    const [updatedUser, setUpdatedUser] = useState(user)
    const { about, dob, firstName, gender, lastName, photoUrl } = updatedUser || {}
    const age = useMemo(() => calculateAge(dob), [dob])

    const dpRef = useRef()
    const dispatch = useDispatch()

    const [handleEditUserProfile, { data: editedUserProfileData, isLoading }] = useEditUserProfileMutation()
    const { data, status } = editedUserProfileData || {}

    const handleChangeUser = (fieldData) => {
        setUpdatedUser((prev) => ({ ...user, ...prev, ...fieldData }))
    }

    useEffect(() => {
        if (data?.user && status?.statusCode === 200) {
            dispatch(signInUser(data.user))
            dpRef.current.src = data?.user?.photoUrl
        }
    }, [dpRef, data?.user, status, dispatch])

    return (
        <Loading isLoading={!user || isLoading}>
            <div className="flex w-full justify-center gap-16">
                <UserProfileForm
                    isCenter
                    cardProps={{ cardProps: { className: 'w-96', isAnimate: false } }}
                    dpRef={dpRef}
                    onChangeUser={handleChangeUser}
                    onSubmit={handleEditUserProfile}
                    user={user}
                />
                <UserCard
                    {...user}
                    noAction
                    about={about ?? user?.about}
                    age={age ?? user?.age}
                    cardProps={{ cardProps: { className: 'w-96', isAnimate: false } }}
                    dpRef={dpRef}
                    firstName={firstName ?? user?.firstName}
                    gender={gender ?? user?.gender}
                    isCenter={false}
                    lastName={lastName ?? user?.lastName}
                    photoUrl={photoUrl ?? user?.photoUrl}
                />
            </div>
        </Loading>
    )
}

export default UserProfile
