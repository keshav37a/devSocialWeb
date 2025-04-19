import { useSelector } from 'react-redux'

import { useGetUserFeedQuery } from 'services'

export const Feed = () => {
    const { user } = useSelector((state) => state.auth)
    const { data } = useGetUserFeedQuery(null, { skip: !user })

    console.log(data)

    return <div>Hello Feed</div>
}
