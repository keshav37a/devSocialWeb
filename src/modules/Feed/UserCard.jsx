export const UserCard = ({
    about,
    age,
    gender,
    noAction,
    isCenter = true,
    firstName,
    fullName,
    lastName,
    photoUrl,
}) => {
    return (
        <div className={`${isCenter ? 'flex justify-center' : ''}`}>
            <div className="card w-96 bg-base-300 shadow-sm">
                <figure>
                    <img alt="Shoes" src={photoUrl} />
                </figure>
                <div className="card-body">
                    <h2 className="card-title break-all">{fullName || `${firstName} ${lastName}`}</h2>
                    <p>Age: {age} years</p>
                    <p>Gender: {gender.charAt(0).toUpperCase() + gender.slice(1)}</p>
                    <p className="break-all">{about}</p>

                    <div className="card-actions flex flex-row justify-evenly">
                        <button className="btn grow btn-primary" disabled={noAction}>
                            Interested
                        </button>
                        <button className="btn grow btn-secondary" disabled={noAction}>
                            Ignore
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
