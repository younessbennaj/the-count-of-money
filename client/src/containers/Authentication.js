import React, { useState, useEffect } from 'react';
import axios from "axios";

//React Router 
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch
} from "react-router-dom";

//Formik
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

//Utils
import { authenticateUser } from "../utils/auth";

//Import components
import Login from "../components/Login";
import Signup from "../components/Signup";
import ErrorMessage from "../components/ErrorMessage";

const AuthenticationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
    password: Yup.string()
        .required('Required'),
});

//Main goal here is to get the JWT and store it in session storage
const Authentication = () => {
    // The `path` lets us build <Route> paths that are
    // relative to the parent route, while the `url` lets
    // us build relative links.
    let { path, url } = useRouteMatch();

    return (
        <div className="flex flex-col items-center  bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <p className="text-center p-5"><Link to={`${url}/login`} className="font-medium text-indigo-600 hover:text-indigo-500">Login</Link> or <Link to={`${url}/signup`} className="font-medium text-indigo-600 hover:text-indigo-500">Signup</Link></p>

            <Switch>
                <Route exact path={path}>
                    <h3>Please select a topic.</h3>
                </Route>
                <Route path={`${path}/login`}>
                    <Login />
                </Route>
                <Route path={`${path}/signup`}>
                    <Signup />
                </Route>
            </Switch>
        </div>
    );
}

export default Authentication;