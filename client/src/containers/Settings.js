import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";

//Utils
import { getAllowedCryptos, getUnAllowedCryptos } from "../utils/cryptos";

//Components
import CryptosAutoComplete from "../components/CryotosAutoComplete";


const Settings = () => {
    let history = useHistory();
    const [allowedCryptos, setAllowedCryptos] = useState([]);
    const [unAllowedCrytos, setUnAllowedCrytos] = useState([])

    function handleUpdateClick() {

        const data = allowedCryptos.map(crypto => {
            return { id: crypto.id };
        });

        axios.post('/cryptos', data)
            .then(response => {
                console.log(response.data);
                history.push('/');
            })

    }

    function handleResetClick() {

        getAllowedCryptos().then(allowed => {
            setAllowedCryptos(allowed);
        })

        getUnAllowedCryptos().then(unAllowed => {
            setUnAllowedCrytos(unAllowed);
        })

    }

    function handleRemoveCrypto(id) {
        //Add the crypto to the unallowed list model
        setUnAllowedCrytos([...unAllowedCrytos, allowedCryptos.find(crypto => crypto.id === id)]);

        //Remove the crypto from the allowed list model 
        setAllowedCryptos(allowedCryptos.filter(crypto => crypto.id !== id));
    }

    useEffect(() => {
        getAllowedCryptos().then(allowed => {
            setAllowedCryptos(allowed);
        })

        getUnAllowedCryptos().then(unAllowed => {
            setUnAllowedCrytos(unAllowed);
        })
    }, []);

    return (
        <div className="border border-gray-500 rounded-lg p-7 box-border">
            <div className="mt-3 mb-6">
                <h2 className="text-2xl light text-center my-2">Crypto-currencies Settings</h2>
                <p className="light text-sm text-gray-500 text-center my-1">Set crypto-currencies configuration</p>
            </div>
            <CryptosAutoComplete
                setAllowedCryptos={setAllowedCryptos}
                allowedCryptos={allowedCryptos}
                unAllowedCrytos={unAllowedCrytos}
                setUnAllowedCrytos={setUnAllowedCrytos}
            />
            <div>
                <span className="uppercase text-gray-400 text-xs ml-2 my-4 inline-block">Allowed cryptocurrencies</span>
                <ul>
                    {allowedCryptos.map(crypto => {
                        return <li key={crypto.id} className="inline-block">
                            <div onClick={() => handleRemoveCrypto(crypto.id)} className="bg-blue-200 rounded-lg px-3 py-2 m-1 text-blue-700 cursor-pointer hover:bg-red-400 hover:text-gray-50 hover:shadow-xl"><span>{crypto.name}</span></div>
                        </li>
                    })}
                </ul>
                <div className="pt-7">
                    <button className="py-2 px-4 rounded-md text-gray-50 text-lg bg-blue-500 border-blue-500 shadow-md mr-2" onClick={handleUpdateClick}>Update</button>
                    <button className="py-2 px-4 rounded-md text-gray-500 text-lg border-gray-500 border" onClick={handleResetClick}>Reset</button>
                </div>
            </div>
        </div>
    );
}

export default Settings;