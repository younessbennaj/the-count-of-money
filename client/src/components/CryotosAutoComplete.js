//Autocomplete component to find a crypto currency 
import React, { useState, useEffect, useReducer } from 'react';
import axios from "axios";

function reducer(state, action) {
    switch (action.type) {
        case "INITIALIZE":
            return { ...state, cryptos: action.payload };
        case "SET_CRYPTOS":
            return { ...state, cryptos: action.payload };
            // return {...state, cryptos: [...action.payload]}
            return state;
        case "REMOVE_CRYPTO":
            return { ...state, cryptos: [...state.cryptos].filter(c => c.id !== action.payload.id) };
        case "ADD_CRYPTO":
            console.log('ADD_CRYPTO');
            return state;
        default:
            return state;
    }
}

const CryptosAutoComplete = () => {
    // //All the cryptos that the admin can add to the preferences
    // const [cryptos, setCryptos] = useState([]);

    //Text query to find with the autocomplete
    const [query, setQuery] = useState('');

    //Selection display bellow the autocomplete input
    const [selection, setSelection] = useState([]);

    //state.cryptos => All the cryptos that the admin can add to the preference
    const [state, dispatch] = useReducer(reducer, { cryptos: [] });

    const [allowedCryptos, setAllowedCryptos] = useState([]);

    useEffect(() => {
        axios.get('/cryptos')
            .then(response => {
                dispatch({ type: "INITIALIZE", payload: response.data });
            });
    }, []);

    useEffect(() => {
        getAutocomplete(query, state.cryptos);
    }, [query]);

    function getAutocomplete(query, data) {
        //Query to find in the data collection

        //Simple autocompete algo that allows us to return a selection of crypto depending on user input text in the search bar
        const selection = data.filter(({ name }) => {

            //if the beginning of the crypto name is the same as the input text
            //then return the crypto
            return name.toLowerCase().slice(0, query.length) === query;
        })

        setSelection(selection);
    }

    function handleInputChange(e) {
        setQuery(e.target.value);
    }

    function handleInputFocus() {
        getAutocomplete(query, state.cryptos);
    }

    function handleAddCrypto(id) {
        if (id) {
            //We add the selected crypto to the allowedCryptos array to send this information to the API
            setAllowedCryptos([...allowedCryptos, id])
            //Then we need to remove the crypto from the current crypto that the admin can allow to the settings
            dispatch({ type: "REMOVE_CRYPTO", payload: { id } })
            //Clear the autcomplete pannel 
            setSelection([]);
            //Clear the input
            setQuery('');
        }
    }

    function handleInputBlur() {
        setSelection([]);
    }

    return (
        <div>
            <h2>CryptosAutoComplete</h2>
            <input value={query} onFocus={handleInputFocus} onBlur={handleInputBlur} onChange={handleInputChange} className="border border-gray-300 focus:outline-none focus:border-blue-400 rounded-md" type="text" />
            <ul>
                {selection.map(({ name, id }) => {
                    return <li onMouseDown={() => handleAddCrypto(id)} key={id}>{name}</li>
                })}
            </ul>
        </div>
    );
}

export default CryptosAutoComplete;