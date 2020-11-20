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

const AuthenticationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
    password: Yup.string()
        .required('Required'),
});

const ErrorMessage = ({ message }) => {
    return (
        <div className="flex items-center text-xs py-1 px-2 bg-white text-red-700 bg-red-100 border border-red-300 ">
            <div className="text-xs font-normal  max-w-full flex-initial">
                {message}
            </div>
        </div>
    )
}

const Login = () => {

    //UI State
    const [error, setError] = useState();


    let { path, url } = useRouteMatch();

    // function submitLoginForm(e) {

    //     e.preventDefault();

    //     const credentials = {
    //         "mail": "mathieu.gorrias@epitech.eu",
    //         "password": "test"
    //     }

    //     //In authencateUser we need to specify if it's a registration or the user just want to signin
    //     authenticateUser(credentials, 'login');
    // }

    return (
        <div className="max-w-md w-full space-y-8">
            <div>
                <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
            </div>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={AuthenticationSchema}
                onSubmit={credentials => {
                    //In authencateUser we need to specify if it's a registration or the user just want to signin
                    authenticateUser(credentials, 'login');
                }}
            >
                {({ errors, touched }) => (
                    <Form className="mt-8 space-y-6">
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="email-address" className="sr-only">Email address</label>
                                <Field id="email" name="email" type="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
                            </div>
                            {errors.email && touched.email ? (
                                <ErrorMessage message={errors.email} />
                            ) : null}
                            <div>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <Field id="password" name="password" type="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
                            </div>
                            {errors.password && touched.password ? (
                                <div>{errors.password}</div>
                            ) : null}
                        </div>
                        <div>
                            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                Sign in
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

const Signup = () => {

    let { path, url } = useRouteMatch();

    function submitSignupForm(e) {

        e.preventDefault();

        const credentials = {
            "mail": "mathieu.gorrias@epitech.eu",
            "password": "test"
        }

        //In authencateUser we need to specify if it's a registration or the user just want to signin
        authenticateUser(credentials, 'register');

    }

    return (
        <div className="max-w-md w-full space-y-8">
            <div>
                <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up</h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={(e) => submitSignupForm(e)}>
                <input type="hidden" name="remember" value="true" />
                <div className="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label htmlFor="email-address" className="sr-only">Email address</label>
                        <input id="email-address" name="email" type="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input id="password" name="password" type="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
                    </div>
                </div>
                <div>
                    <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                            <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                        </span>
                        Sign up
                                </button>
                </div>
            </form>
        </div>
    );
}


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