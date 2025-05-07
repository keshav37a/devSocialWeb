import { Loading } from '@CoreUI'
import { UserCard } from '@Feed/UserCard'

import { useSendConnectionRequestMutation } from '@Connections/connectionsApi'
import { useGetUserFeedQuery } from '@Feed/feedApi'

import { getCookieValue } from 'src/utils'

export const Feed = () => {
    const token = getCookieValue('token')

    const { data: feed, isLoading } = useGetUserFeedQuery(null, { skip: !token })
    const [handleSendConnectionRequest] = useSendConnectionRequestMutation()
    const { _id, about, age, firstName, gender, lastName, photoUrl } = feed?.[0] || {}

    return (
        <Loading isLoading={isLoading}>
            <div className="feed">
                {feed && feed.length > 0 ? (
                    <UserCard
                        about={about}
                        age={age}
                        cardProps={{
                            containerProps: { className: 'mb-6' },
                            cardProps: { className: 'w-[60%] max-w-120' },
                        }}
                        firstName={firstName}
                        gender={gender}
                        key={_id}
                        lastName={lastName}
                        onSendRequest={handleSendConnectionRequest}
                        photoUrl={photoUrl}
                        userId={_id}
                    />
                ) : null}
            </div>
        </Loading>
    )
}
