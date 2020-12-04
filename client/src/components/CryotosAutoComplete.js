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
            console.log('REMOVE_CRYPTO');
            return state;
        case "ADD_CRYPTO":
            console.log('ADD_CRYPTO');
            return state;
        default:
            return state;
    }
}

const CryptosAutoComplete = () => {
    const [cryptos, setCryptos] = useState([]);

    const [selection, setSelection] = useState([]);

    const [state, dispatch] = useReducer(reducer, { cryptos: [] });


    useEffect(() => {
        axios.get('/cryptos')
            .then(response => {
                dispatch({ type: "INITIALIZE", payload: response.data })
                setCryptos(response.data);
            });
    }, []);

    function handleInputChange(e) {
        //Simple autocompete algo that allows us to return a selection of crypto depending on user input text in the search bar
        const selection = state.cryptos.filter(({ name }) => {
            //if the beginning of the crypto name is the same as the input text
            //then return the crypto
            return name.toLowerCase().slice(0, e.target.value.length) === e.target.value;
        })
        setSelection(selection);
        // dispatch({ type: "SET_CRYPTOS", payload: selection })
        // setCryptos(selection);
    }

    function handleAddCrypto(id) {
        console.log(id);
    }

    return (
        <div>
            <h2>CryptosAutoComplete</h2>
            <input onChange={handleInputChange} className="border border-gray-300 focus:outline-none focus:border-blue-400 rounded-md" type="text" />
            <ul>
                {selection.map(({ name, id }) => {
                    return <li onClick={() => handleAddCrypto(id)} key={id}>{name}</li>
                })}
            </ul>
        </div>
    );
}

export default CryptosAutoComplete;