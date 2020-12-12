import React, { useState, useEffect } from 'react'

import { getUserCryptos } from "../utils/cryptos";

const ProfileCard = ({ credentials, isEditMode, setIsEditMode }) => {

    const [userCryptos, setUserCryptos] = useState([]);

    useEffect(() => {
        getUserCryptos().then(cryptos => {
            setUserCryptos(cryptos);
        })
    }, [isEditMode]);

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
                        <p className="text-xl my-2 uppercase">{credentials.currency}</p>
                    </div>

                    <div>
                        <span className="uppercase text-gray-400 text-xs my-4 inline-block">Your cryptocurrencies preferences</span>
                        <ul className="">
                            {userCryptos.length ?

                                userCryptos.map(crypto => {
                                    return (
                                        <li key={crypto.id} className="inline-block">
                                            <span className="bg-blue-200 rounded-lg px-3 py-2 inline-block m-1 text-blue-700">{crypto.name}</span>
                                        </li>
                                    )
                                })
                                :
                                <p>(No crypto-currencies preferences)</p>
                            }
                        </ul>
                    </div>
                    <div>
                        <span className="uppercase text-gray-400 text-xs my-4 inline-block">Your news preferences</span>
                        <ul className="profile-card__chips-list">
                            {credentials.tags.length ?
                                credentials.tags.map(tag => {
                                    return (
                                        <li key={tag} className="inline-block">
                                            <span className="bg-blue-200 rounded-lg px-2 py-2 inline-block m-1 text-blue-700">#{tag}</span>
                                        </li>
                                    )
                                })
                                :
                                <p>(No news preferences)</p>
                            }
                        </ul>
                    </div>
                </div>
            }
        </>
    )
}

export default ProfileCard;