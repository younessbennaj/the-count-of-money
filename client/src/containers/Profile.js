import React, { useState, useEffect, useReducer } from 'react';
import axios from "axios";

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
                    <div>
                        <label htmlFor="username">Username</label>
                        <input onChange={handleUsernameChange} type="text" name="username" id="username" />
                    </div>
                    <select onChange={e => handleCurrencyChange(e)} name="currency" id="currency">
                        {currenciesMock.map(currency => <option key={currency} value={currency}>{currency}</option>)}
                    </select>
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

function reducer(state, action) {
    let { listCrypto: cryptocurrencies, tags, username, currency, value } = action.payload;
    switch (action.type) {
        //We initlialize our reducer with the value fetched from the user profile
        case 'INITIALIZE':
            return { ...state, cryptocurrencies, tags, username, currency };
        case 'ADD_CRYPTOS':
            //Add the value in the cryptocurrencies list
            return { ...state, cryptocurrencies: [...state.cryptocurrencies, value] };
        case 'REMOVE_CRYPTOS':
            //Remove the value from the cryptocurrencies list
            return { ...state, cryptocurrencies: state.cryptocurrencies.filter(crypto => crypto !== value) };
        case 'ADD_TAGS':
            //Add the value in the tags list
            return { ...state, tags: [...state.tags, value] };
        case 'REMOVE_TAGS':
            //Remove the value from the tags list
            return { ...state, tags: state.tags.filter(tag => tag !== value) };
        case 'UPDATE_USERNAME':
            //Update the username value in the local state
            return { ...state, username };
        case 'UPDATE_CURRENCY':
            //Update the username value in the local state
            return { ...state, currency };
        default:
            return { ...state };
    }
}
const Profile = () => {

    //boolean to know if we are in edit mode or not
    const [isEditMode, setIsEditMode] = useState(false);

    //Reducer to handle and collect cryptocurrencies and tags preferences of the user
    const [state, dispatch] = useReducer(reducer, { cryptocurrencies: [], tags: [] });

    useEffect(() => {
        axios.get("/users/profile")
            .then(response => {
                const { listCrypto, tags } = response.data;
                //Set user crendentials
                dispatch({ type: 'INITIALIZE', payload: response.data });
            })
    }, []);

    return (
        <div>
            <h2>Profile here</h2>
            {/* If the user want to update his profile and preferences, then switch to edit mode (=> display ProfileForm) */}
            {!isEditMode ?
                <ProfileCard
                    credentials={state}
                    setIsEditMode={setIsEditMode}
                />
                :
                <ProfileForm
                    dispatch={dispatch}
                    credentials={state}
                    setIsEditMode={setIsEditMode}
                />
            }
        </div>
    );
}

export default Profile;