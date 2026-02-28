import { useDispatch } from 'react-redux'

import { Loading } from '@components'
import { UserConnectionCard } from '@connections/components/UserConnectionCard'

import { addChat } from '@chat/api/chat-slice'
import { useGetUserConnectionsQuery, useRemoveConnectionMutation } from '@connections/api/connections-api'

import { getCookieValue } from 'src/utils'

export const Connections = () => {
    const token = getCookieValue('token')

    const dispatch = useDispatch()
    const { data: userConnections, isLoading } = useGetUserConnectionsQuery(null, { skip: !token })
    const [handleRemoveConnection] = useRemoveConnectionMutation()

    const handleRemoveConnectionHelper = (userId) => () => handleRemoveConnection({ userId })
    const handleAddChat = (userData) => () => {
        dispatch(addChat(userData))
    }

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
                          onAddChat={handleAddChat({ _id, about, age, fullName, gender, photoUrl })}
                          onRemoveConnection={handleRemoveConnectionHelper(_id)}
                          photoUrl={photoUrl}
                      />
                  ))
                : null}
        </Loading>
    )
}

export default Connections
