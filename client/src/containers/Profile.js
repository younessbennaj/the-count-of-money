import React, { useState, useEffect, useReducer } from 'react';
import axios from "axios";

function reducer(state, action) {
    let { cryptocurrencies, tags, value } = action.payload;
    switch (action.type) {
        //We initlialize our reducer with the value fetched from the user profile
        case 'INITIALIZE':
            let { listCrypto: cryptocurrencies, tags } = action.payload;
            return { ...state, cryptocurrencies, tags };
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
        default:
            console.log('default');
            return { ...state };
    }
}
const Profile = () => {

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

    const [credentials, setCredentials] = useState(null);

    //Options of crytos that the user can add to his preferences 
    const [cryptosOptions, setCryptosOptions] = useState(cryptosMock);

    //Options of news tags that the user can add to his preferences 
    const [tagsOptions, setTagsOptions] = useState(tagsMock);
    //
    const [state, dispatch] = useReducer(reducer, { cryptocurrencies: [], tags: [] });

    useEffect(() => {
        axios.get("/users/profile")
            .then(response => {
                const { listCrypto, tags } = response.data;
                console.log(listCrypto);
                setCredentials(response.data);
                dispatch({ type: 'INITIALIZE', payload: { listCrypto, tags } });
            })
    }, []);

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

    function handleFormSubmit(e) {
        e.preventDefault();
        console.log(state.cryptocurrencies);
        console.log(state.tags);

        const userCredentials = {
            mail: credentials.mail,
            username: credentials.username,
            currency: credentials.currency,
            cryptocurrencies: state.cryptocurrencies,
            tags: state.tags
        }

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
            })
        console.log(userCredentials);
    }

    function isUserPreferences(value, preferences) {
        //Check if the value is in the user preferences
        return !!preferences.find(preference => preference === value);
    }
    return (
        <div>
            <h2>Profile here</h2>

            {/* Profile Card */}
            {credentials &&
                <div className="profile-card">
                    <h2>{credentials.username}</h2>
                    <p>{credentials.currency}</p>
                    <ul className="profile-card__chips-list">
                        {cryptosOptions.map(crypto => {
                            return (
                                <li key={crypto} className="profile-card__chips-item">
                                    <span>{crypto}</span>
                                </li>
                            )
                        })}
                    </ul>
                    <ul className="profile-card__chips-list">
                        {tagsOptions.map(tag => {
                            return (
                                <li key={tag} className="profile-card__chips-item">
                                    <span>{tag}</span>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            }

            {/* Profile Form */}
            {credentials &&
                <form className="profile-form" onSubmit={e => handleFormSubmit(e)}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" id="username" />
                    </div>
                    <select name="currency" id="currency">
                        <option value="EUR">EUR</option>
                        <option value="USD">USD</option>
                        <option value="JPY">JPY</option>
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
                                        defaultChecked={isUserPreferences(crypto, credentials.listCrypto)}
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
        </div>
    );
}

export default Profile;