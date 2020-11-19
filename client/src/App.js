import React, { useState, useEffect } from 'react';
import axios from "axios";

//React Router 
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

//Layout HOC
import { withLayout } from "./hoc/Layout";

//Import containers 
import Dashboard from "./containers/Dashboard";
import Authentication from "./containers/Authentication";

//Import components
import Navbar from "./components/Navbar";

function App() {

  //Return page component with identical layout wrapper
  const DashboardWithLayout = withLayout(Dashboard);

  const AuthenticationWithLayout = withLayout(Authentication);

  const [message, setMessage] = useState("");

  useEffect(() => {
    //with the real API
    // axios.get('http://localhost:5000/api')
    //   .then(response => {
    //     console.log(response.data);
    //     setMessage(response.data.message)
    //   })


  }, []);
  return (
    <Router>
      <div>
        <Navbar />



        <Switch>
          {/* Dashboard Route */}
          <Route path="/" exact>
            <DashboardWithLayout title="Dashboard" />
          </Route>

          {/* Authentication Route */}
          {/* Nested routes => no "exact" */}
          <Route path="/authentication">
            <AuthenticationWithLayout title="Authentication" />
          </Route>

          {/* Articles Route */}
          <Route path="/articles" exact>
            <header className="bg-white shadow">
              <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold leading-tight text-gray-900">
                  News
              </h1>
              </div>
            </header>
            <main>
              <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                  <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
                    <h1>New content here</h1>
                  </div>
                </div>
              </div>
            </main>
          </Route>


          {/* Profile Route */}
          <Route path="/profile" exact>
            <header className="bg-white shadow">
              <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold leading-tight text-gray-900">
                  Profile
              </h1>
              </div>
            </header>
            <main>
              <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                  <div className="border-4 border-dashed border-gray-200 rounded-lg h-96"></div>
                </div>
              </div>
            </main>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
