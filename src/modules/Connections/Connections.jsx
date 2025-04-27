import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Image, Loading } from '@CoreUI'
import { Card } from '@CoreUI/Card'

import { addConnections } from '@Connections/connectionsSlice'
import { useGetUserConnectionsQuery } from 'services/apiSlice'

import { getGenderDisplayName } from 'src/utils'

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
                      <Card
                          isCenter
                          cardBodyProps={{ className: 'flex-row' }}
                          cardProps={{ className: 'w-[60%]' }}
                          containerProps={{ className: 'mb-4 flex flex-col' }}
                          key={_id}
                      >
                          <Image className="mr-4 h-25 w-25 rounded-full" src={photoUrl} />
                          <div className="user-content">
                              <h2 className="card-title">{fullName}</h2>
                              <p>{`${age}, ${getGenderDisplayName(gender)}`}</p>
                              <p className="mt-2">{about}</p>
                          </div>
                      </Card>
                  ))
                : null}
        </Loading>
    )
}
