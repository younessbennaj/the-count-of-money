import React, { useState } from 'react';
import axios from 'axios';

const ProfileForm = ({ credentials, dispatch, setIsEditMode }) => {

    /* 
        credentials => user credentials local state fetched from the API

        dispatch => function to dispatch action to the user preferences reducer function

        setIsEditMode => method to update the UI state that handle normal/edit switch mode of the profile
    
    */

    // *** MOCK API DATA ***

    //Mock Data model of Cryptos added by the administrator 
    const cryptosMock = [
        "Bitcoin",
        "Ethereum",
        "XRP",
        "Tether",
        "BitcoinCash",
        "Chainlink",
        "Litecoin",
        "Cardano",
        "Polkadot",
        "BinanceCoin"
    ];

    //Mock Data model of Tags added by the administrator
    const tagsMock = [
        "blockchain",
        "crypto",
        "cryptocurrency",
        "ethereum",
        "bitcoin",
        "cryptotrading"
    ]

    //Mock data model of avaible currencies 
    const currenciesMock = [
        "EUR",
        "USD",
        "JPY"
    ]

    // *** LOCAL STATE ***

    //Options of crytos that the user can add to his preferences 
    const [cryptosOptions, setCryptosOptions] = useState(cryptosMock);

    //Options of news tags that the user can add to his preferences 
    const [tagsOptions, setTagsOptions] = useState(tagsMock);

    //Local state to handle user currency preference 
    const [currency, setCurrency] = useState('');

    // *** Event handlers *** 

    //Handle username change 
    function handleUsernameChange(e) {
        //Update the username proprety in the user credentials local data model
        dispatch({ type: "UPDATE_USERNAME", payload: { username: e.target.value } })
    }

    //Handle currency change
    function handleCurrencyChange(e) {
        //Update the currency proprety in the user credentials local data model
        dispatch({ type: "UPDATE_CURRENCY", payload: { currency: e.target.value } })
    }

    //Handle crypto-currencies change 
    function handleCryptoChange(e) {
        const { value, checked } = e.target;
        //If the value isn't already checked (not in the user preferences)
        if (e.target.checked) {
            dispatch({ type: 'ADD_CRYPTOS', payload: { value } });
        } else {
            //If it's already in the user preferences
            dispatch({ type: 'REMOVE_CRYPTOS', payload: { value } });
        }
    }

    //Handle tags change 
    function handleTagChange(e) {
        const { value, checked } = e.target;
        //If the value isn't already checked (not in the user preferences)
        if (e.target.checked) {
            dispatch({ type: 'ADD_TAGS', payload: { value } });
        } else {
            //If it's already in the user preferences
            dispatch({ type: 'REMOVE_TAGS', payload: { value } });
        }
    }

    //Handle the form submission 
    function handleFormSubmit(e) {
        e.preventDefault();

        const userCredentials = {
            mail: credentials.mail,
            username: credentials.username,
            currency: credentials.currency,
            cryptocurrencies: credentials.cryptocurrencies,
            tags: credentials.tags
        }

        console.log(userCredentials);

        var data = JSON.stringify(userCredentials);

        var config = {
            method: 'put',
            url: '/users/profile',
            headers: {
                'Content-Type': 'application/json',
                //add JWT in global config header
            },
            data: data
        };

        axios(config)
            .then(response => {
                console.log(response.data);
                //Leave the edit mode and return to the profile card
                setIsEditMode(false)
            })
    }

    //utils
    function isUserPreferences(value, preferences) {
        //Check if the value is in the user preferences
        return !!preferences.find(preference => preference === value);
        // return true;
    }

    return (
        <>
            {credentials &&
                <form className="profile-form" onSubmit={e => handleFormSubmit(e)}>
                    <div className="flex">
                        <label htmlFor="username" class="block text-sm font-medium text-gray-700">Username</label>
                        <input value={credentials.username} onChange={handleUsernameChange} type="text" name="username" id="username" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="currency">Currency</label>
                        <select
                            onChange={e => handleCurrencyChange(e)}
                            name="currency"
                            id="currency"
                            defaultValue={credentials.currency}
                            className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                        >
                            {currenciesMock.map(currency => <option key={currency} value={currency} >{currency}</option>)}
                        </select>
                    </div>
                    <fieldset onChange={e => handleCryptoChange(e)}>
                        <legend>Select a crypto</legend>
                        {cryptosOptions.map(crypto => {
                            return (
                                <div key={crypto}>
                                    <input
                                        type="checkbox"
                                        id={crypto}
                                        name={crypto}
                                        value={crypto}
                                        //True, if the crypto value from the admin selection is in the user preferences
                                        defaultChecked={isUserPreferences(crypto, credentials.cryptocurrencies)}
                                    />
                                    <label htmlFor={crypto}>{crypto}</label>
                                </div>
                            )
                        })}

                    </fieldset>
                    <fieldset onChange={e => handleTagChange(e)}>
                        <legend>Select a tag</legend>
                        {tagsOptions.map(tag => {
                            return (
                                <div key={tag}>
                                    <input
                                        type="checkbox"
                                        id={tag}
                                        name={tag}
                                        value={tag}
                                        //True, if the tag value from the admin selection is in the user preferences
                                        defaultChecked={isUserPreferences(tag, credentials.tags)}
                                    />
                                    <label htmlFor={tag}>{tag}</label>
                                </div>
                            )
                        })}
                    </fieldset>
                    <input type="submit" value="submit" />
                </form>
            }
        </>
    )
}

export default ProfileForm;