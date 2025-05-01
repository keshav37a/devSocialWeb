import { Button, Card, Image, Loading } from '@CoreUI'

import { useGetUserConnectionRequestsQuery, useRespondToConnectionRequestMutation } from '@Connections/connectionsApi'

import { getGenderDisplayName } from 'src/utils'

export const ConnectionRequests = () => {
    const { data: connectionRequests, isLoading } = useGetUserConnectionRequestsQuery()
    const [handleRespondToConnectionRequest, { _ }] = useRespondToConnectionRequestMutation()

    const handleRespondToConnectionRequestHelper =
        ({ status, connectionRequestId }) =>
        () =>
            handleRespondToConnectionRequest({ status, connectionRequestId })

    return (
        <Loading isLoading={isLoading}>
            {connectionRequests
                ? connectionRequests?.map(({ fromUser, _id }) => {
                      const { _id: userId, about, age, fullName, gender, photoUrl } = fromUser
                      return (
                          <Card
                              isCenter
                              cardBodyProps={{ className: 'flex-row' }}
                              cardProps={{ className: 'w-[60%]' }}
                              containerProps={{ className: 'mb-4 flex flex-col' }}
                              key={userId}
                          >
                              <Image
                                  alt="user-profile-pic"
                                  className="mr-4 h-25 w-25 min-w-25"
                                  imgProps={{ className: 'rounded-full' }}
                                  src={photoUrl}
                              />
                              <div className="user-content">
                                  <h2 className="card-title">{fullName}</h2>
                                  <p>{`${age}, ${getGenderDisplayName(gender)}`}</p>
                                  <p className="mt-2">{about}</p>
                              </div>
                              <div className="btn-container flex-end ml-auto flex min-w-80">
                                  <Button
                                      className="w-36"
                                      label="Accept"
                                      onClick={handleRespondToConnectionRequestHelper({
                                          status: 'accepted',
                                          connectionRequestId: _id,
                                      })}
                                  />
                                  <Button
                                      className="ml-4 w-36"
                                      label="Reject"
                                      onClick={handleRespondToConnectionRequestHelper({
                                          status: 'rejected',
                                          connectionRequestId: _id,
                                      })}
                                  />
                              </div>
                          </Card>
                      )
                  })
                : null}
        </Loading>
    )
}
