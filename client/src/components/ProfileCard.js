const ProfileCard = ({ credentials, setIsEditMode }) => {

    /* 
        credentials => user credentials local state fetched from the API

        setIsEditMode => method to update the UI state that handle normal/edit switch mode of the profile
    
    */
    function handleEditModeClick() {
        //If the user click on the "edit" button, then we switch to the edit mode and render the ProfileForm
        setIsEditMode(true);
    }
    return (
        <>
            {credentials &&
                <div className="profile-card">
                    <button onClick={handleEditModeClick}>Edit</button>
                    <h2>{credentials.username}</h2>
                    <p>{credentials.currency}</p>
                    <ul className="profile-card__chips-list">
                        {credentials.cryptocurrencies.map(crypto => {
                            return (
                                <li key={crypto} className="profile-card__chips-item">
                                    <span>{crypto}</span>
                                </li>
                            )
                        })}
                    </ul>
                    <ul className="profile-card__chips-list">
                        {credentials.tags.map(tag => {
                            return (
                                <li key={tag} className="profile-card__chips-item">
                                    <span>{tag}</span>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            }
        </>
    )
}

export default ProfileCard;