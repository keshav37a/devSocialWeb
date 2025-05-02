import { Loading } from '@CoreUI'
import { UserCard } from '@Feed/UserCard'

import { useSendConnectionRequestMutation } from '@Connections/connectionsApi'
import { useGetUserFeedQuery } from '@Feed/feedApi'

import { getCookieValue } from 'src/utils'

export const Feed = () => {
    const token = getCookieValue('token')

    const { data: feed, isLoading } = useGetUserFeedQuery(null, { skip: !token })
    const [handleSendConnectionRequest] = useSendConnectionRequestMutation()

    return (
        <Loading isLoading={isLoading}>
            <div className="feed">
                {feed && feed.length > 0
                    ? feed.map(({ _id, about, age, fullName, gender, photoUrl }) => (
                          <UserCard
                              about={about}
                              age={age}
                              cardProps={{ containerProps: { className: 'mb-6' } }}
                              fullName={fullName}
                              gender={gender}
                              key={_id}
                              onSendRequest={handleSendConnectionRequest}
                              photoUrl={photoUrl}
                              userId={_id}
                          />
                      ))
                    : null}
            </div>
        </Loading>
    )
}
