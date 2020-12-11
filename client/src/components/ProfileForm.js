import React, { useState } from 'react';
import UIChips from "./UIChips";
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
    const [cryptosOptions] = useState(cryptosMock);

    //Options of news tags that the user can add to his preferences 
    const [tagsOptions] = useState(tagsMock);

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
        if (checked) {
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
        if (checked) {
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
            nickname: credentials.username,
            currencies: credentials.currency,
            listCrypto: credentials.cryptocurrencies,
            listWeb: credentials.tags
        }

        var data = JSON.stringify(userCredentials);

        axios.put('/users/profile', data) 
            .then(response => {
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
                    <div className="flex flex-col mt-1 relative rounded-md shadow-sm my-4">
                        <label 
                            htmlFor="username" className="block text-sm font-medium text-gray-700 pl-1 pb-1"
                        >
                            Username
                        </label>
                        <input
                            value={credentials.username} 
                            onChange={handleUsernameChange} 
                            type="text" 
                            name="username" 
                            id="username" 
                            className="
                                focus:ring-indigo-500 
                                focus:border-indigo-500 
                                h-full py-3 pl-2 pr-7 
                                border-transparent 
                                bg-transparent 
                                text-gray-700 
                                border border-gray-400
                                sm:text-sm rounded-md"
                    />
                    </div>
                    <div className="flex flex-col mt-1 relative rounded-md shadow-sm my-4">
                        <label  className="block text-sm font-medium text-gray-700 pl-1 pb-1" htmlFor="currency" >Currency</label>
                        <select
                            onChange={e => handleCurrencyChange(e)}
                            name="currency"
                            id="currency"
                            defaultValue={credentials.currency}
                            className="
                                focus:ring-indigo-500 
                                focus:border-indigo-500 
                                h-full py-3 pl-2 pr-4 
                                border-transparent 
                                bg-transparent 
                                text-gray-700 
                                border border-gray-400
                                sm:text-sm rounded-md"
                        >
                            {currenciesMock.map(currency => <option key={currency} value={currency} >{currency}</option>)}
                        </select>
                    </div>
                    <fieldset onChange={e => handleCryptoChange(e)} className="my-4">
                        <legend className="block text-sm font-medium text-gray-700 pl-1 pb-1">Select a crypto</legend>
                        {cryptosOptions.map(crypto => {
                            return (
                                <UIChips 
                                    key={crypto} 
                                    item={crypto}  
                                    //True, if the crypto value from the admin selection is in the user preferences
                                    defaultChecked={isUserPreferences(crypto, credentials.cryptocurrencies)}
                                />
                            )
                        })}

                    </fieldset>
                    <fieldset onChange={e => handleTagChange(e)} className="my-4">
                        <legend className="block text-sm font-medium text-gray-700 pl-1 pb-1">Select a tag</legend>
                        {tagsOptions.map(tag => {
                            return (
                                <UIChips 
                                    key={tag} 
                                    item={tag}  
                                    //True, if the tag value from the admin selection is in the user preferences
                                    defaultChecked={isUserPreferences(tag, credentials.tags)}
                                />
                            )
                        })}
                    </fieldset>
                    <input 
                        className="mt-6 py-2 px-4 bg-blue-500 rounded-md text-gray-50 text-lg hover:bg-blue-600"
                        type="submit" 
                        value="submit"
                    />
                </form>
            }
        </>
    )
}

export default ProfileForm;