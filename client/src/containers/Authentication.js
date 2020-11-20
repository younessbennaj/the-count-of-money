
//React Router 
import {
    Switch,
    Route,
    Link,
    useRouteMatch
} from "react-router-dom";

//Import components
import Login from "../components/Login";
import Signup from "../components/Signup";

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