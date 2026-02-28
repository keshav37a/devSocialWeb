import { useMemo } from 'react'

import { Loading } from '@components'
import { UserCard } from '@feed/components'

import { useSendConnectionRequestMutation } from '@connection-requests/api/connection-requests-api'
import { useGetUserFeedQuery } from '@feed/api/feed-api'

import { getCookieValue } from 'src/utils'

export const Feed = () => {
    const token = getCookieValue('token')

    const { data: feed, isLoading } = useGetUserFeedQuery(null, { skip: !token })
    const [handleSendConnectionRequest] = useSendConnectionRequestMutation()
    const { _id, about, age, firstName, gender, lastName, photoUrl } = feed?.[0] || {}

    const cardProps = useMemo(
        () => ({
            containerProps: { className: 'mb-6' },
            cardProps: { className: 'w-[60%] max-w-120' },
        }),
        []
    )

    return (
        <Loading isLoading={isLoading}>
            <div className="feed">
                {feed && feed.length > 0 ? (
                    <UserCard
                        about={about}
                        age={age}
                        cardProps={cardProps}
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

export default Feed
