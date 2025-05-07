import { Card, Image } from '@CoreUI'
import { Button } from '@CoreUI/Form'

import { getGenderDisplayName } from 'src/utils'

export const UserConnectionCard = ({ _id, about, age, fullName, gender, onRemoveConnection, photoUrl }) => {
    const handleRemoveConnection = () => onRemoveConnection?.()

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
                <p>{`${age}, ${getGenderDisplayName(gender)}`}</p>
                <p className="mt-2">{about}</p>
            </div>
            <Button className="ml-auto" label="Remove connection" onClick={handleRemoveConnection} />
        </Card>
    )
}
