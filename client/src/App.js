import React, { useEffect } from 'react';
import axios from "axios";

//React Router 
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

//Layout HOC
import { withLayout } from "./hoc/Layout";

//Protected Route HOC
import { PrivateRoute, AdminRoute } from "./hoc/PrivateRoute";

//Import containers 
import Dashboard from "./containers/Dashboard";
import Cryptocurrency from "./containers/Cryptocurrency";
import News from "./containers/News";
import Article from "./containers/Article";
import Authentication from "./containers/Authentication";
import Profile from "./containers/Profile";
import Settings from "./containers/Settings";

//Import components
import Navbar from "./components/Navbar";

//Auth Hook
import { useAuthContext } from "./hooks/use-auth";

function App() {

  //Return page component with identical layout wrapper
  const DashboardWithLayout = withLayout(Dashboard);
  const CryptocurrencyWithLayout = withLayout(Cryptocurrency);
  const NewsWithLayout = withLayout(News);
  const ArticleWithLayout = withLayout(Article);

  const AuthenticationWithLayout = withLayout(Authentication);

  const ProfileWithLayout = withLayout(Profile);

  const SettingsWithLayout = withLayout(Settings);

  const { getUser, isAuth } = useAuthContext();

  //We get user credentials when we mount the page if the user is already logged
  //e.g: When we refresh the page 
  useEffect(() => {
    if (isAuth()) {
      axios.defaults.headers.common['jwt'] = sessionStorage.getItem('jwt');
      getUser();
    }
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

          {/* Article Route */}
          <PrivateRoute path="/cryptocurrency" exact>
            <CryptocurrencyWithLayout title="Cryptocurrency" backTo="/" />
          </PrivateRoute>

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
            <ArticleWithLayout title="Article" backTo="/articles" />
          </Route>

          {/* Profile Route */}
          <PrivateRoute path="/profile" exact>
            <ProfileWithLayout title="Profile" />
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
