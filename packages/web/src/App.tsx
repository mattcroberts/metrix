import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient, { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-boost';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Box, Flex } from 'rebass/styled-components';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import './App.css';
import { Nav } from './components/Nav';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Provider as AuthContextProvider } from './contexts/Auth';
import introspectionQueryResultData from './generated/fragmentTypes.json';
import './index.css';
import { AnalysesListPage } from './pages/analyses';
import { CreateAnalysisPage } from './pages/analyses/create';
import { MetricAnalysisPage } from './pages/analyses/metric';
import { AnalysisPage } from './pages/analyses/view';
import { HomePage } from './pages/home';
import { LoginPage } from './pages/login';
import { CreateMetricPage } from './pages/metric/create';
import { EditMetricPage } from './pages/metric/edit';
import { theme } from './theme';
import Cookie from 'js-cookie';
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
  uri: './graphql',
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
          <BrowserRouter basename="/metrix">
            <Flex justifyContent="center">
              <Box maxWidth={1024} flex="1">
                <Nav />
                <Switch>
                  <Route path="/login" component={LoginPage} />
                  <ProtectedRoute path="/metrics/new" component={CreateMetricPage} />
                  <ProtectedRoute path="/metrics/:id/edit" component={EditMetricPage} />
                  <ProtectedRoute path="/metrics/:id" component={MetricAnalysisPage} />
                  <ProtectedRoute path="/analyses/new" component={CreateAnalysisPage} />
                  <ProtectedRoute path="/analyses/:id" component={AnalysisPage} />
                  <ProtectedRoute path="/analyses" component={AnalysesListPage} />
                  <ProtectedRoute path="/" component={HomePage} />
                </Switch>
              </Box>
            </Flex>
          </BrowserRouter>
        </ApolloProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;
