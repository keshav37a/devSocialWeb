import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { UserConnectionCard } from '@Connections/UserConnectionCard'
import { Loading } from '@CoreUI'

import { addConnectionRequests } from '@Connections/connectionsSlice'

import { useGetUserConnectionRequestsQuery } from '@Connections/connectionsApi'

export const ConnectionRequests = () => {
    const { connectionRequests } = useSelector((state) => state.connections)
    const { data, isLoading } = useGetUserConnectionRequestsQuery()
    const dispatch = useDispatch()

    useEffect(() => {
        const connectionRequestsArr = data?.data?.connectionRequests
        if (connectionRequestsArr) {
            dispatch(addConnectionRequests(connectionRequestsArr))
        }
    }, [data?.data?.connectionRequests, dispatch])

    return (
        <Loading isLoading={isLoading}>
            {connectionRequests
                ? connectionRequests?.map(({ _id, about, age, fullName, gender, photoUrl }) => (
                      <UserConnectionCard
                          about={about}
                          age={age}
                          fullName={fullName}
                          gender={gender}
                          key={_id}
                          photoUrl={photoUrl}
                      />
                  ))
                : null}
        </Loading>
    )
}
