import React, { useState } from 'react';
import CryptosAutoComplete from "../components/CryotosAutoComplete";

const Settings = () => {
    const [allowedCryptos, setAllowedCryptos] = useState([]);
    return (
        <div>
            <h2>Settings Page</h2>
            <CryptosAutoComplete setAllowedCryptos={setAllowedCryptos} allowedCryptos={allowedCryptos} />
            <div>
                <h4>Allowed Cryptos</h4>
                <ul>
                    {allowedCryptos.map(crypto => {
                        return <li key={crypto}>{crypto}</li>
                    })}
                </ul>
            </div>
        </div>
    );
}

export default Settings;