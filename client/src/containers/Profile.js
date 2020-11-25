import React, { useState, useEffect } from 'react';
import axios from "axios";
const Profile = () => {

    const [credentials, setCredentials] = useState({});

    useEffect(() => {
        axios.get("/users/profile")
            .then(response => {
                console.log(response.data);
            })
    }, []);
    return (
        <div>
            <h2>Profile here</h2>
        </div>
    );
}

export default Profile;