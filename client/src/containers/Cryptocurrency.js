import React, { useState, useEffect } from 'react';
import axios from "axios";
import Moment from "moment";
import {
    useLocation
  } from "react-router-dom";
//Style
import "../index.css";

//Chart

const Cryptocurrency = () => {
    let location = useLocation();
    let cryptoId = location.state.cryptoId;
    console.log(cryptoId);

    const [crypto, setCrypto] = useState("");

    useEffect(() => {
        //With MSWJS actived
        axios.get('/crypto/bitcoin')     //{cryptoId}')
        .then(response => {
            setCrypto(response.data);
        })
    }, []);

    if (crypto !== "") {
        return (
            <div className="flex flex-wrap max-w-5xl mx-auto">
                <div className="w-full flex flex-col p-2">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col">
                        <img className="bg-auto" src={crypto.image.large} alt="" width="200"></img>
                        <p className="p-4">Last update : {Moment(crypto.last_updated).format('d MMMM y')}</p>
                        <div className="p-4 flex-1 flex flex-col">
                            <h3 className="mb-4 text-xl">{crypto.name}</h3>
                            <div className="mb-4 text-grey-darker text-sm flex-1">
                                <div dangerouslySetInnerHTML={{ __html: crypto.description.en }} />
                            </div>
                            <a href={crypto.links.homepage[0]} className="border-t border-grey-light pt-2 text-xs text-blue hover:text-red uppercase no-underline tracking-wide">Official website</a>
                            <p className="text-xs">{crypto.symbol}</p>
                        </div>
                    </div>  
                </div>
            </div>
        );
    } else {
        return ("Loading...");
    }

    
}

export default Cryptocurrency;