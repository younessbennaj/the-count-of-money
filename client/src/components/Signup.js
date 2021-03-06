//React Router
import {
    useRouteMatch,
    useLocation,
    useHistory
} from "react-router-dom";

//Formik
import { Formik, Form, Field } from 'formik';

//Import components
import ErrorMessage from "./ErrorMessage";

//Hook to handle user authentification
import { useAuthContext } from "../hooks/use-auth";

//Utils
import { AuthenticationSchema } from "../utils/schemas";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Signup = () => {

    let history = useHistory();

    let { path } = useRouteMatch();

    let query = useQuery();

    // Auth Hook => get the signin method to authenticate the user
    const { signin } = useAuthContext();

    if (query.get('token')) {
        sessionStorage.setItem('jwt', query.get('token'));
        history.push("/");
    }

    return (
        <div className="max-w-md w-full space-y-8">
            <div>
                <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up</h2>
            </div>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={AuthenticationSchema}
                onSubmit={credentials => {
                    //In authencateUser we need to specify if it's a registration or the user just want to signin
                    signin(credentials, 'register', () => {
                        //Redirect to the home page when user is logged in
                        history.push("/authentication/login");
                    });
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
                                <ErrorMessage message={errors.password} />
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
            <div>
                <h2 className="my-2 py-3 text-center text-sm font-extrabold text-gray-400">Or continue with these social profile</h2>
                <div className="flex flex-row justify-around">
                    <button className="py-2 px-4 rounded-md text-indigo-600 text-lg border border-indigo-600 bg-transparent shadow-sm mr-2"><a href="http://localhost:5000/users/auth/google">Signup with Google</a></button>
                    <button className="py-2 px-4 rounded-md text-indigo-600 text-lg border border-indigo-600 bg-transparent shadow-sm mr-2"><a href="http://localhost:5000/users/auth/facebook">Signup with Facebook</a></button>
                </div>
            </div>
        </div>
    );
}

export default Signup;