import React, { useState, useEffect, useReducer } from 'react';
import axios from "axios";

//Auth hook 
import { useUserContext } from "../hooks/use-auth";

//import component here 
import ProfileCard from '../components/ProfileCard';
import ProfileForm from '../components/ProfileForm';

function reducer(state, action) {
    let { cryptocurrencies, tags, username, currency, value } = action.payload;
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

    const user = useUserContext();

    console.log(user);

    //boolean to know if we are in edit mode or not
    const [isEditMode, setIsEditMode] = useState(false);

    //Reducer to handle and collect cryptocurrencies and tags preferences of the user
    const [state, dispatch] = useReducer(reducer, { cryptocurrencies: [], tags: [] });

    useEffect(() => {
        axios.get("/users/profile")
            .then(response => {

                //Format the response data
                const { nickname: username, listWeb: tags, listCrypto: cryptocurrencies, currencies: currency } = response.data;

                const payload = {
                    username,
                    tags,
                    cryptocurrencies,
                    currency
                }

                //Set user crendentials
                dispatch({ type: 'INITIALIZE', payload });
            })
    }, []);

    return (
        <div className="sm:w-full md:w-full lg:w-1/2 mx-auto sm:px-6 lg:px-8 pb-4">
            <div className="mt-3 mb-6">
                <h2 className="text-2xl light text-center my-2">Profile informations</h2>
                <p className="light text-sm text-gray-500 text-center my-1">Some info like your username, currency and app preferences</p>
            </div>
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