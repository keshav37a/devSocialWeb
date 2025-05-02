import { useEffect } from 'react'

import { useDispatch } from 'react-redux'

import { UserConnectionCard } from '@Connections/UserConnectionCard'
import { Loading } from '@CoreUI'

import { showToast } from '@CoreUI/coreUISlice'

import { useGetUserConnectionsQuery, useRemoveConnectionMutation } from '@Connections/connectionsApi'

import { getCookieValue } from 'src/utils'

export const Connections = () => {
    const token = getCookieValue('token')
    const {
        data: userConnections,
        isLoading,
        error: userConnectionsError,
    } = useGetUserConnectionsQuery(null, { skip: !token })
    const [handleRemoveConnection, { error: removeConnectionError }] = useRemoveConnectionMutation()
    const dispatch = useDispatch()

    const handleRemoveConnectionHelper = (userId) => async () => {
        try {
            await handleRemoveConnection({ userId })
            dispatch(showToast({ content: 'Connection removed successfully. ' }))
        } catch {
            console.log('error')
        }
    }

    useEffect(() => {
        if (removeConnectionError) {
            dispatch(showToast({ error: removeConnectionError }))
        }
    }, [removeConnectionError, dispatch, userConnectionsError])

    useEffect(() => {
        if (userConnectionsError) {
            dispatch(showToast({ error: userConnectionsError }))
        }
    }, [dispatch, userConnectionsError])

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
                          onRemoveConnection={handleRemoveConnectionHelper(_id)}
                          photoUrl={photoUrl}
                      />
                  ))
                : null}
        </Loading>
    )
}
