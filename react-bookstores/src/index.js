import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
/* React redux */
import { Provider } from 'react-redux'

/* Import custom */
import { isJSON } from 'utils/helpers';
import configureStore  from './configureStore';
import LoginPage from "layouts/LoginPage/LoginPage.jsx";
import Website from "layouts/Website/Website.jsx";

import "assets/css/material-dashboard-react.css?v=1.5.0";

import indexRoutes from "routes/index.jsx";

const hist = createBrowserHistory();

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        <Route path="/site" component={Website} />
        <Route path="/login" component={LoginPage} />
        {indexRoutes.map((prop, key) => {
          return <PrivateRoute path={prop.path} component={prop.component} key={key} />;
        })}
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);

function PrivateRoute({ component: Component, ...rest }) {
  const loginInfo = localStorage.getItem('USER')
  const userInfo = isJSON(loginInfo) && JSON.parse(loginInfo);

  return (
    <Route
      {...rest}
      render={props =>  !!userInfo ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
      }
    />
  );
}
