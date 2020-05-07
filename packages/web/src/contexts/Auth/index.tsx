import Cookie from 'js-cookie';
import React, { createContext, FC } from 'react';

export const AuthContext = createContext<{ isAuthenticated: boolean }>({
  isAuthenticated: false,
});

export const Provider: FC = ({ children }) => {
  const tokenFromCookie = Cookie.get('x-auth-token');
  return <AuthContext.Provider value={{ isAuthenticated: !!tokenFromCookie }}>{children}</AuthContext.Provider>;
};
