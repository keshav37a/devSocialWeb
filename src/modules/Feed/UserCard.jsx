export const UserCard = ({ isCenter = true, fullName, about, photoUrl, gender, age }) => {
    return (
        <div className={`${isCenter ? 'flex justify-center' : ''}`}>
            <div className="card w-96 bg-base-300 shadow-sm">
                <figure>
                    <img alt="Shoes" src={photoUrl} />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{fullName}</h2>
                    <p>Age: {age} years</p>
                    <p>Gender: {gender}</p>
                    <p>{about}</p>
                    <div className="card-actions flex flex-row justify-evenly">
                        <button className="btn grow btn-primary">Interested</button>
                        <button className="btn grow btn-secondary">Ignore</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
