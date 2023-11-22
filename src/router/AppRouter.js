import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

import { Dashboard } from "../pages/Dashboard";
import { AuthRouter } from "./AuthRouter";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";

export const AppRouter = () => {
  const { auth, checkToken } = useContext(AuthContext);

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  if (auth.checking) {
    return <h1>Loading</h1>;
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            isAuthenticated={auth.logged}
            path="/auth"
            component={AuthRouter}
          />
          <PrivateRoute
            isAuthenticated={auth.logged}
            exact
            path="/"
            component={Dashboard}
          />

          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};
