import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import './App.css';
import { HomePage } from './pages/home';
import { CreateMetricPage } from './pages/metric/create';
import { EditMetricPage } from './pages/metric/edit';
import { Nav } from './components/Nav';
import { Box, Flex } from 'rebass/styled-components';
import { theme } from './theme';
import { AnalysesPage } from './pages/analyses';
import { MetricAnalysisPage } from './pages/analyses/metric';

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
              <Route path="/metrics/:id/edit" component={EditMetricPage} />
              <Route path="/metrics/:id" component={MetricAnalysisPage} />
              <Route path="/analyses" component={AnalysesPage} />
              <Route path="/" component={HomePage} />
            </Switch>
          </Box>
        </Flex>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
