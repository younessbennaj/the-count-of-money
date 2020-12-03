import React, { useContext } from 'react';

//Use a context to pass the authenticated user through the components tree 

export const userContext = React.createContext(null);

//Mock user data from API
const user = {
    mail: "john.doe@email.com",
    nickname: "johndoe",
    currencies: "EUR",
    listCrypto: [
        "Bitcoin",
        "Ethereum",
        "XRP",
        "Tether",
        "BitcoinCash"
    ],
    listWeb: [
        "blockchain",
        "bitcoin",
        "cryptotrading"
    ]

};

export const UserContextProvider = ({ children }) => {
    return (
        //We use the Provider component to init the context with a default value for the wrapper component hierarchy
        <userContext.Provider value={user}>
            {children}
        </ userContext.Provider>
    )
}

//Utils to use user context value inside children component logic that are wrapped by the UserContextProvider 
export const useUserContext = () => {
    const user = useContext(userContext);
    return user;
}

