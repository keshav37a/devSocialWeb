import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { UserConnectionCard } from '@Connections/UserConnectionCard'
import { Loading } from '@CoreUI'

import { addConnections } from '@Connections/connectionsSlice'

import { useGetUserConnectionsQuery } from '@Connections/connectionsApi'

export const Connections = () => {
    const { connections } = useSelector((state) => state.connections)
    const { data, isLoading } = useGetUserConnectionsQuery()
    const dispatch = useDispatch()

    useEffect(() => {
        const connectionsArr = data?.data?.connections
        if (connectionsArr) {
            dispatch(addConnections(connectionsArr))
        }
    }, [data?.data?.connections, dispatch])

    return (
        <Loading isLoading={isLoading}>
            {connections
                ? connections?.map(({ _id, about, age, fullName, gender, photoUrl }) => (
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
