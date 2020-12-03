/*/
    HOC to re use the logic of authentication and procted route 
    If a component is wrapped by this logic, there are two case:
    
        - The user is authenticated: we render the initial component 
        - The user isn't authenticated: we render another UI for unauthenticated user or redirect to another route path
/*/

import { Route } from "react-router-dom";

//Auth hook 
import { useUserContext } from "../hooks/use-auth";

export function PrivateRoute({ children, path }) {

    const user = useUserContext();

    //Boolean that tell us if the user is authenticated
    // const isAuth = !!sessionStorage.getItem('jwt') && !!user;
    const isAuth = false;

    console.log('PRIVATE ROUTE', isAuth);

    return (
        <Route path={path}>
            {isAuth ? children : <h2>Unauthenticated</h2>}
        </Route>
    )
}

