import React, { useState, useEffect } from 'react';
import axios from "axios";
import CryptosAutoComplete from "../components/CryotosAutoComplete";
import UIChips from "../components/UIChips";

const Settings = () => {
    const [allowedCryptos, setAllowedCryptos] = useState([]);

    function handleUpdateClick() {
        console.log('update cryptos global config');
    }

    function handleResetClick() {
        console.log('reset cryptos config');
    }

    useEffect(() => {
        axios.get('/cryptos')
            .then(response => {
                let allowed = response.data.filter(crypto => {
                    return crypto.allowed;
                }).map(crypto => {
                    return crypto.name
                });

                setAllowedCryptos(allowed);
            });
    }, []);

    return (
        <div>
            <h2>Settings Page</h2>
            <CryptosAutoComplete setAllowedCryptos={setAllowedCryptos} allowedCryptos={allowedCryptos} />
            <div>
                <h4>Allowed Cryptos</h4>
                <ul>
                    {allowedCryptos.map(crypto => {
                        return <li key={crypto} className="inline-block">
                            <span className="bg-blue-200 rounded-lg px-3 py-2 inline-block m-1 text-blue-700">{crypto}</span>
                        </li>
                    })}
                </ul>
                <div>
                    <button onClick={handleUpdateClick}>Update cryptos</button>
                    <button onClick={handleResetClick}>Reset</button>
                </div>
            </div>
        </div>
    );
}

export default Settings;