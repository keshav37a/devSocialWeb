import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Loading } from '@CoreUI'
import { UserCard } from '@Feed/UserCard'

import { addFeed } from '@Feed/feedSlice'

import { useGetUserFeedQuery } from '@Feed/feedApi'

export const Feed = () => {
    const { user } = useSelector((state) => state.auth)
    const { data, isLoading } = useGetUserFeedQuery(null, { skip: !user })
    const { feed } = useSelector((state) => state.feed)
    const dispatch = useDispatch()

    useEffect(() => {
        const feedArr = data?.data?.feed
        if (feedArr && feedArr.length > 0) {
            dispatch(addFeed(feedArr))
        }
    }, [dispatch, data])

    return (
        <Loading isLoading={isLoading}>
            <div className="feed">
                {feed
                    ? feed.map(({ _id, about, age, fullName, gender, photoUrl }) => (
                          <UserCard
                              about={about}
                              age={age}
                              cardProps={{ containerProps: { className: 'mb-6' } }}
                              fullName={fullName}
                              gender={gender}
                              key={_id}
                              photoUrl={photoUrl}
                          />
                      ))
                    : null}
            </div>
        </Loading>
    )
}
