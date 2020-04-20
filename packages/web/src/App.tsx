import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Box, Flex } from 'rebass/styled-components';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import './App.css';
import { Nav } from './components/Nav';
import { AnalysesListPage } from './pages/analyses';
import { CreateAnalysisPage } from './pages/analyses/create';
import { MetricAnalysisPage } from './pages/analyses/metric';
import { AnalysisPage } from './pages/analyses/view';
import { HomePage } from './pages/home';
import { CreateMetricPage } from './pages/metric/create';
import { EditMetricPage } from './pages/metric/edit';
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
              <Route path="/metrics/:id/edit" component={EditMetricPage} />
              <Route path="/metrics/:id" component={MetricAnalysisPage} />
              <Route path="/analyses/create" component={CreateAnalysisPage} />
              <Route path="/analyses/:id" component={AnalysisPage} />
              <Route path="/analyses" component={AnalysesListPage} />
              <Route path="/" component={HomePage} />
            </Switch>
          </Box>
        </Flex>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
