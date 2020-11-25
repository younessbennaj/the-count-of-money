import React, { useEffect } from 'react';

//React Router 
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

//Layout HOC
import { withLayout } from "./hoc/Layout";

//Import containers 
import Dashboard from "./containers/Dashboard";
import News from "./containers/News";
import Article from "./containers/Article";
import Authentication from "./containers/Authentication";
import Profile from "./containers/Profile";

//Import components
import Navbar from "./components/Navbar";

function App() {

  //Return page component with identical layout wrapper
  const DashboardWithLayout = withLayout(Dashboard);
  const NewsWithLayout = withLayout(News);
  const ArticleWithLayout = withLayout(Article);

  const AuthenticationWithLayout = withLayout(Authentication);

  const ProfileWithLayout = withLayout(Profile);

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
          <NewsWithLayout title="News" />
        </Route>

        {/* Article Route */}
        <Route path="/article" exact>
          <ArticleWithLayout title="Article" backTo="/articles"/>
        </Route>


          {/* Profile Route */}
          <Route path="/profile" exact>
            <ProfileWithLayout title="Profile" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
