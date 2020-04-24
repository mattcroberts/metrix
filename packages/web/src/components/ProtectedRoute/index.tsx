import React, { FC, useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { AuthContext } from '../../contexts/Auth';

export const ProtectedRoute: FC<RouteProps> = (props) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) {
    return <Route {...props} />;
  }

  console.log('Unauthenticated');

  return <Redirect to="/login" />;
};
