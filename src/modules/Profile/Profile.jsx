import { useSelector } from 'react-redux'

import { UserProfileForm } from '@Profile/UserProfileForm'

export const Profile = () => {
    const { user } = useSelector((state) => state.auth)

    return <UserProfileForm isCenter user={user} />
}
