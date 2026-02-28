import { Button, Card, Image } from '@components'

import { getGenderDisplayName } from 'src/utils'

export const UserConnectionCard = ({ _id, about, age, fullName, gender, onAddChat, onRemoveConnection, photoUrl }) => {
    const handleRemoveConnection = () => onRemoveConnection?.()
    const handleAddChat = () => onAddChat?.()

    return (
        <Card
            isCenter
            cardBodyProps={{ className: 'flex-row' }}
            cardProps={{ className: 'w-[60%]' }}
            containerProps={{ className: 'mb-4 flex flex-col' }}
            key={_id}
        >
            <Image
                alt="user-profile-pic"
                className="mr-4 h-25 w-25 min-w-25"
                imgProps={{ className: 'rounded-full' }}
                src={photoUrl}
            />
            <div className="user-content grow-1">
                <h2 className="card-title">{fullName}</h2>
                <p>
                    {age ?? ''}
                    {gender ? `, ${getGenderDisplayName(gender)}` : ''}
                </p>
                <p className="mt-2">{about}</p>
            </div>
            <div className="card-action-container flex min-w-42 flex-col justify-center">
                <Button className="ml-auto" label="Remove connection" onClick={handleRemoveConnection} />
                <Button className="mt-2 ml-auto btn-primary" label="Chat" onClick={handleAddChat} />
            </div>
        </Card>
    )
}

export default UserConnectionCard
