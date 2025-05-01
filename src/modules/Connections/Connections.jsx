import { useEffect } from 'react'

import { useDispatch } from 'react-redux'

import { UserConnectionCard } from '@Connections/UserConnectionCard'
import { Loading } from '@CoreUI'

import { showToast } from '@CoreUI/coreUISlice'

import { useDeleteConnectionMutation, useGetUserConnectionsQuery } from '@Connections/connectionsApi'

export const Connections = () => {
    const { data: userConnections, isLoading, error: userConnectionsError } = useGetUserConnectionsQuery()
    const [handleDeleteConnection, { error: deleteConnectionError }] = useDeleteConnectionMutation()
    const dispatch = useDispatch()

    const handleDeleteConnectionHelper = (userId) => () => handleDeleteConnection({ userId })

    useEffect(() => {
        if (deleteConnectionError || userConnectionsError) {
            dispatch(showToast({ error: deleteConnectionError || userConnectionsError }))
        }
    }, [deleteConnectionError, dispatch, userConnectionsError])

    return (
        <Loading isLoading={isLoading}>
            {userConnections && userConnections.length >= 0
                ? userConnections?.map(({ _id, about, age, fullName, gender, photoUrl }) => (
                      <UserConnectionCard
                          about={about}
                          age={age}
                          fullName={fullName}
                          gender={gender}
                          key={_id}
                          onDeleteConnection={handleDeleteConnectionHelper(_id)}
                          photoUrl={photoUrl}
                      />
                  ))
                : null}
        </Loading>
    )
}
