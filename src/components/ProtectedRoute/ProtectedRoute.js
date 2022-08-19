import React from 'react';
import {Redirect, Route} from 'react-router-dom';

const ProtectedRoute = ({component: Component, loggedIn, checkToken, ...props}) => {

  return (
    <Route>
      {() =>
        loggedIn ? <Component {...props} loggedIn={loggedIn}/> : <Redirect to="/signin"/>
      }
    </Route>
  );
};

export default ProtectedRoute;
