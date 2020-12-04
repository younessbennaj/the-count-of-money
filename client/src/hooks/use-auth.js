import React, { useContext, useState } from 'react';

import { authenticateUser, logoutUser, getUserCredentials } from "../utils/auth";

//Use a context to pass the authenticated user through the components tree 
export const authContext = React.createContext(null);

function useProvideAuth() {
    const [user, setUser] = useState(null);

    const signin = (credentials, type, cb) => {
        return authenticateUser(credentials, type, () => {
            //the user is successfuly logged in
            getUserCredentials(credentials => {
                //we get the user credentials
                setUser(credentials);
                //Task to accomplish when the user is logged and we get his credentials
                //e.g: redirect to the "/" route
                cb();
            })
        });
    };

    const getUser = () => {
        getUserCredentials(credentials => {
            //we get the user credentials
            setUser(credentials);
        })
    }

    const signout = (cb) => {
        logoutUser().then(() => {
            setUser(null);
            //sucessfuly signed out
            cb();
        });
    }

    const isAuth = () => {
        //return a boolean to check if the user is logged in
        return !!sessionStorage.getItem('jwt');
    }

    const isAdmin = () => {
        return user ? !!user.right : null;
    }


    return {
        user,
        setUser,
        isAuth,
        isAdmin,
        signin,
        signout
    };
}

export const AuthContextProvider = ({ children }) => {
    const auth = useProvideAuth();
    return (
        //We use the Provider component to init the context with a default value for the wrapper component hierarchy
        <authContext.Provider value={auth}>
            {children}
        </ authContext.Provider>
    )
}

//Utils to use user context value inside children component logic that are wrapped by the UserContextProvider 
export const useAuthContext = () => {
    const auth = useContext(authContext);
    return auth;
}

