/*/
    HOC to re use the logic of authentication and procted route 
    If a component is wrapped by this logic, there are two case:
    
        - The user is authenticated: we render the initial component 
        - The user isn't authenticated: we render another UI for unauthenticated user or redirect to another route path
/*/

import { Redirect, Route } from "react-router-dom";

//Auth hook 
import { useAuthContext } from "../hooks/use-auth";

export function PrivateRoute({ children, path }) {

    //Boolean that tell us if the user is authenticated
    const { isAuth } = useAuthContext();

    return (
        <Route path={path}>
            {isAuth() ?
                children :
                <Redirect
                    to={{
                        pathname: "/authentication/login"
                    }}
                />}
        </Route>
    )
}

export function AdminRoute({ children, path }) {

    //Boolean that tell us if the user is authenticated
    const { isAuth, isAdmin } = useAuthContext();

    return (
        <Route path={path}>
            {isAuth() && isAdmin() ?
                children :
                <Redirect
                    to={{
                        pathname: "/"
                    }}
                />}
        </Route>
    )
}


