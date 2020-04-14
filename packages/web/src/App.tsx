import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import './App.css';
import { HomePage } from './pages/home';
import { CreateMetricPage } from './pages/metric/create';
import { MetricPage } from './pages/metric/edit';
import { MetricListPage } from './pages/metrics-list';
const theme = require('@rebass/preset');

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path="/metrics/new" component={CreateMetricPage} />
          <Route path="/metrics/:id" component={MetricPage} />
          <Route path="/metrics" component={MetricListPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
