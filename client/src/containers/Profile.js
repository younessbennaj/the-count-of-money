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

            {/* Profile Card */}
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

            {/* Profile Form */}
            {credentials &&
                <form className="profile-form">
                    <div>
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" id="username" />
                    </div>
                    <select name="currency" id="currency">
                        <option value="EUR">EUR</option>
                        <option value="USD">USD</option>
                        <option value="JPY">JPY</option>
                    </select>
                    <fieldset>
                        {credentials.cryptocurrencies.map(crypto => {
                            return (
                                <div>
                                    <input type="checkbox" id={crypto} name={crypto} value={crypto} />
                                    <label htmlFor={crypto}>{crypto}</label>
                                </div>
                            )
                        })}

                    </fieldset>
                    <fieldset>
                        {credentials.cryptocurrencies.map(crypto => {
                            return (
                                <div>
                                    <input type="radio" id={crypto} name="cryptocurrencies" value={crypto} />
                                    <label htmlFor={crypto}>{crypto}</label>
                                </div>
                            )
                        })}
                    </fieldset>
                </form>
            }
        </div>
    );
}

export default Profile;