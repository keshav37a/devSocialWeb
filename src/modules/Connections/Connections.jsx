import { UserConnectionCard } from '@Connections/UserConnectionCard'
import { Loading } from '@CoreUI'

import { useGetUserConnectionsQuery, useRemoveConnectionMutation } from '@Connections/connectionsApi'

import { getCookieValue } from 'src/utils'

export const Connections = () => {
    const token = getCookieValue('token')
    const { data: userConnections, isLoading } = useGetUserConnectionsQuery(null, { skip: !token })
    const [handleRemoveConnection] = useRemoveConnectionMutation()

    const handleRemoveConnectionHelper = (userId) => () => handleRemoveConnection({ userId })

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
