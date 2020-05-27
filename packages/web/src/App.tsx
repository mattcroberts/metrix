import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient, { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-boost';
import Cookie from 'js-cookie';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Box, Flex } from 'rebass/styled-components';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Nav } from './components/Nav';
import { Provider as AuthContextProvider } from './contexts/Auth';
import introspectionQueryResultData from './generated/fragmentTypes.json';
import './index.css';
import { Routes } from './routes';
import { theme } from './theme';
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

const cache = new InMemoryCache({ fragmentMatcher });

const client = new ApolloClient({
  request: (operation) => {
    const token = Cookie.get('x-auth-token');

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    });
  },
  cache,
  uri: process.env.NODE_ENV === 'production' ? `${process.env.PUBLIC_URL}/graphql` : '/graphql',
});
const GlobalStyle = createGlobalStyle({
  body: { background: theme.colors.pageBackground, color: theme.colors.text },
  button: { cursor: 'pointer' },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AuthContextProvider>
        <ApolloProvider client={client}>
          <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
            <Flex justifyContent="center">
              <Box maxWidth={1024} flex="1">
                <Nav />
                <Routes />
              </Box>
            </Flex>
          </BrowserRouter>
        </ApolloProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;
