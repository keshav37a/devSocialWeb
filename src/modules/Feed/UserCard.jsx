import { Button, Image } from '@CoreUI'

export const UserCard = ({
    about,
    age,
    dpRef,
    gender,
    noAction,
    isCenter = true,
    firstName,
    fullName,
    lastName,
    photoUrl,
}) => {
    return (
        <div className={`max-h-120 ${isCenter ? 'flex justify-center' : ''}`}>
            <div className="card w-96 bg-base-300 shadow-sm">
                <Image
                    alt="profile-pic"
                    className="h-50 max-h-50"
                    imgProps={{ className: 'h-full', ref: dpRef }}
                    src={photoUrl}
                />
                <div className="card-body">
                    <h2 className="card-title break-all">{fullName || `${firstName} ${lastName}`}</h2>
                    <p>Age: {age} years</p>
                    <p>Gender: {gender.charAt(0).toUpperCase() + gender.slice(1)}</p>
                    <p className="break-all">{about}</p>

                    <div className="card-actions flex flex-row justify-evenly">
                        <Button className="grow btn-primary" disabled={noAction} label="Interested" />
                        <Button className="grow btn-secondary" disabled={noAction} label="Ignore" />
                    </div>
                </div>
            </div>
        </div>
    )
}
