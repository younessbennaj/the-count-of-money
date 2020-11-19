import React, { useState, useEffect } from 'react';
import axios from "axios";

//React Router 
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from "react-router-dom";

//Main goal here is to get the JWT and store it in session storage
const Authentication = () => {
    // The `path` lets us build <Route> paths that are
    // relative to the parent route, while the `url` lets
    // us build relative links.
    let { path, url } = useRouteMatch();

    useEffect(() => {
        axios.post('/api/users/register')
            .then(response => {
                console.log(response.data.token);
            })
    }, []);
    console.log(path);
    return (
        <>
            <h1>Authentication</h1>

            <ul>
                <li>
                    <Link to={`${url}/login`}>Login</Link>
                </li>
                <li>
                    <Link to={`${url}/signup`}>Signup</Link>
                </li>
            </ul>
            <Switch>
                <Route exact path={path}>
                    <h3>Please select a topic.</h3>
                </Route>
                <Route path={`${path}/login`}>
                    <p>Login</p>
                </Route>
                <Route path={`${path}/signup`}>
                    <p>Signup</p>
                </Route>
            </Switch>
        </>
    );
}

export default Authentication;