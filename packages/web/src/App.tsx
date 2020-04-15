import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import './App.css';
import { HomePage } from './pages/home';
import { CreateMetricPage } from './pages/metric/create';
import { MetricPage } from './pages/metric/edit';
import { MetricListPage } from './pages/metrics-list';
import { Nav } from './components/Nav';
import { Box, Flex } from 'rebass/styled-components';
import { theme } from './theme';

const GlobalStyle = createGlobalStyle({
  body: { background: theme.colors.background, color: theme.colors.text },
  button: { cursor: 'pointer' },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Flex justifyContent="center">
          <Box maxWidth={1024} flex="1">
            <Nav />
            <Switch>
              <Route path="/metrics/new" component={CreateMetricPage} />
              <Route path="/metrics/:id" component={MetricPage} />
              <Route path="/metrics" component={MetricListPage} />
              <Route path="/" component={HomePage} />
            </Switch>
          </Box>
        </Flex>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
