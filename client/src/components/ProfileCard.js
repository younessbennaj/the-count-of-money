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
                <div className="border border-gray-500 rounded-lg p-7 box-border">
                    <div className="flex flex-row justify-between items-center py-5">
                        <p className="text-3xl">Profile</p>
                        <button
                            onClick={handleEditModeClick}
                            className="py-2 px-4 rounded-md text-gray-500 text-lg border-gray-500 border"
                        >Edit
                        </button>
                    </div>

                    <div>
                        <span className="uppercase text-gray-400 text-xs">username</span>
                        <p className="text-xl my-2">{credentials.username}</p>
                    </div>
                    <div>
                        <span className="uppercase text-gray-400 text-xs">default currency</span>
                        <p className="text-xl my-2">{credentials.currency}</p>
                    </div>

                    <div>
                        <span className="uppercase text-gray-400 text-xs my-4 inline-block">Your cryptocurrencies preferences</span>
                        <ul className="">
                            {credentials.cryptocurrencies.map(crypto => {
                                return (
                                    <li key={crypto} className="inline-block">
                                        <span className="bg-blue-200 rounded-lg px-3 py-2 inline-block m-1 text-blue-700">{crypto}</span>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div>
                        <span className="uppercase text-gray-400 text-xs my-4 inline-block">Your news preferences</span>
                        <ul className="profile-card__chips-list">
                            {credentials.tags.map(tag => {
                                return (
                                    <li key={tag} className="inline-block">
                                        <span className="bg-blue-200 rounded-lg px-2 py-2 inline-block m-1 text-blue-700">#{tag}</span>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            }
        </>
    )
}

export default ProfileCard;