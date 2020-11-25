import React, { useState, useEffect } from 'react';
import axios from "axios";
const Profile = () => {

    const [credentials, setCredentials] = useState(null);

    useEffect(() => {
        axios.get("/users/profile")
            .then(response => {
                console.log(response.data);
                setCredentials(response.data);
            })
    }, []);
    return (
        <div>
            <h2>Profile here</h2>

            {credentials &&
                <div className="profile-card">
                    <h2>{credentials.username}</h2>
                    <p>{credentials.currency}</p>
                    <ul className="profile-card__chips-list">
                        {credentials.cryptocurrencies.map(crypto => {
                            return (
                                <li key={crypto} className="profile-card__chips-item">
                                    <span>{crypto}</span>
                                </li>
                            )
                        })}
                    </ul>
                    <ul className="profile-card__chips-list">
                        {credentials.tags.map(tag => {
                            return (
                                <li key={tag} className="profile-card__chips-item">
                                    <span>{tag}</span>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            }
        </div>
    );
}

export default Profile;