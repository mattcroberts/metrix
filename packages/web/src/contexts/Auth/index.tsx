import React, { createContext, FC, useState } from 'react';
import Cookie from 'js-cookie';

export const AuthContext = createContext<{ isAuthenticated: boolean }>({
  isAuthenticated: false,
});

export const Provider: FC = ({ children }) => {
  const tokenFromCookie = Cookie.get('x-auth-token');
  return <AuthContext.Provider value={{ isAuthenticated: !!tokenFromCookie }}>{children}</AuthContext.Provider>;
};
