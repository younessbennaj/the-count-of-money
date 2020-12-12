import React from 'react';


//React router 
import {
    Link,
    useHistory
} from "react-router-dom";

//Auth hook 
import { useAuthContext } from "../hooks/use-auth";


const Navbar = () => {

    let history = useHistory();

    //Create a ref to work with dom element
    const mobileMenu = React.createRef(null);
    const pannel = React.createRef(null);

    //Method to signout the user
    const { signout, isAuth, isAdmin } = useAuthContext();

    function handleToggleMenu() {

        if (mobileMenu.current.className === `hidden`) {
            mobileMenu.current.className = "h-auto absolute top-full right-0 left-0 bg-gray-800 z-10";
        } else {
            mobileMenu.current.className = `hidden`;
        }

    }

    function handleTogglePannel() {
        if (pannel.current.className === "hidden") {
            pannel.current.className = "origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
        } else {
            pannel.current.className = "hidden";
        }

    }


    function logout(e) {
        e.preventDefault();
        signout(() => {
            history.push("/");
        })
    }

    return (
        <nav className="bg-gray-800 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <img className="h-8 w-8" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow" />
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900">Dashboard</Link>

                                <Link to="/articles" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700">News</Link>
                                {isAuth()}
                                {/* Non Protected link => render login link only when the user is unauthenticated */}
                                {!isAuth() && <Link to="/authentication/login" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700">Login</Link>}

                                {/* <a href="/#" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700">Projects</a>

                                <a href="/#" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700">Calendar</a>

                                <a href="/#" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700">Reports</a> */}
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                            {/* <button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                <span className="sr-only">View notifications</span>
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                            </button> */}

                            {/* Protected link => render only if the user is authenticated */}

                            {isAuth() && (
                                <div className="ml-3 relative">
                                    <div>
                                        <button onClick={handleTogglePannel} className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu" aria-haspopup="true">
                                            <span className="sr-only">Open user menu</span>
                                            <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                        </button>
                                    </div>


                                    <div ref={pannel} className="hidden" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                                        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Your Profile</Link>
                                        {/* Protected link => only accessible by admin */}
                                        {/* {isAdmin() && <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Settings</Link>} */}
                                        <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Settings</Link>
                                        <a onClick={(e) => logout(e)} href="/#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Sign out</a>
                                    </div>
                                </div>
                            )}



                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button onClick={handleToggleMenu} className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open main menu</span>

                            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>

                            <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>


            <div className="hidden md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <a href="/#" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900">Dashboard</a>

                    <a href="/#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">Team</a>

                    <a href="/#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">Projects</a>

                    <a href="/#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">Calendar</a>

                    <a href="/#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">Reports</a>
                </div>
                <div className="pt-4 pb-3 border-t border-gray-700">
                    <div className="flex items-center px-5">
                        <div className="flex-shrink-0">
                            <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                        </div>
                        <div className="ml-3">
                            <div className="text-base font-medium leading-none text-white">Tom Cook</div>
                            <div className="text-sm font-medium leading-none text-gray-400">tom@example.com</div>
                        </div>
                        <button className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">View notifications</span>
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </button>
                    </div>
                    <div className="mt-3 px-2 space-y-1">
                        <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">Your Profile</Link>

                        {/* <a href="/#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">Settings</a> */}

                        <a href="/#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">Sign out</a>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className="hidden" ref={mobileMenu}>
                <ul className="text-gray-50 text-xl py-5">
                    <li onClick={handleToggleMenu}><Link to="/" className="pl-6 py-3 inline-block" >Dashboard</Link></li>
                    <li onClick={handleToggleMenu}><Link to="/articles" className="pl-6 py-3 inline-block" >News</Link></li>
                    {isAuth() && <li onClick={handleToggleMenu}><Link to="/profile" className="pl-6 py-3 inline-block" >Profile</Link></li>}
                    {isAdmin() && <li onClick={handleToggleMenu}><Link to="/settings" className="pl-6 py-3 inline-block" >Settings</Link></li>}
                    {!isAuth() && <li onClick={handleToggleMenu}><Link to="/authentication/login" className="pl-6 py-3 inline-block" >Login</Link></li>}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;