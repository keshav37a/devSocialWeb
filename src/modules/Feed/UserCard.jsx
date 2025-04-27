import { Button, Card, Image } from '@CoreUI'

import { getGenderDisplayName } from 'src/utils'

export const UserCard = ({
    about,
    age,
    cardProps,
    dpRef,
    firstName,
    fullName,
    gender,
    isCenter = true,
    lastName,
    noAction,
    photoUrl,
}) => {
    return (
        <Card containerProps={{ className: 'max-h-120' }} isCenter={isCenter} {...cardProps}>
            <Image
                alt="profile-pic"
                className="h-50 max-h-50"
                imgProps={{ className: 'h-full', ref: dpRef }}
                src={photoUrl}
            />
            <h2 className="card-title break-all">{fullName || `${firstName} ${lastName}`}</h2>
            <p>Age: {age} years</p>
            <p>Gender: {getGenderDisplayName(gender)}</p>
            <p className="break-all">{about}</p>

            <div className="card-actions flex flex-row justify-evenly">
                <Button className="grow btn-primary" disabled={noAction} label="Interested" />
                <Button className="grow btn-secondary" disabled={noAction} label="Ignore" />
            </div>
        </Card>
    )
}
