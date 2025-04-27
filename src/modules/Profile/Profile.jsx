import { useMemo, useRef, useState } from 'react'

import { useSelector } from 'react-redux'

import { Loading } from '@CoreUI'
import { UserCard } from '@Feed/UserCard'
import { UserProfileForm } from '@Profile/UserProfileForm'

import { calculateAge } from 'src/utils'

export const Profile = () => {
    const { user } = useSelector((state) => state.auth)
    const [updatedUser, setUpdatedUser] = useState(user)
    const { about, dob, firstName, gender, lastName, photoUrl } = updatedUser || {}
    const age = useMemo(() => calculateAge(dob), [dob])

    const dpRef = useRef()

    const handleChangeUser = (fieldData) => {
        setUpdatedUser((prev) => ({ ...user, ...prev, ...fieldData }))
    }

    return (
        <Loading isLoading={!user}>
            <div className="flex justify-center gap-16">
                <UserProfileForm isCenter dpRef={dpRef} onChangeUser={handleChangeUser} user={user} />
                <UserCard
                    {...user}
                    noAction
                    about={about ?? user?.about}
                    age={age ?? user?.age}
                    cardProps={{ cardProps: { className: 'w-96' } }}
                    dpRef={dpRef}
                    firstName={firstName ?? user?.firstName}
                    gender={gender ?? user?.gender}
                    lastName={lastName ?? user?.lastName}
                    photoUrl={photoUrl ?? user?.photoUrl}
                />
            </div>
        </Loading>
    )
}
