import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AnalysesListPage } from './pages/analyses';
import { CreateAnalysisPage } from './pages/analyses/create';
import { MetricAnalysisPage } from './pages/analyses/metric';
import { AnalysisPage } from './pages/analyses/view';
import { HomePage } from './pages/home';
import { LoginPage } from './pages/login';
import { CreateMetricPage } from './pages/metric/create';
import { EditMetricPage } from './pages/metric/edit';
import { SettingsPage } from './pages/settings';

export const Routes = () => (
  <Switch>
    <Route path="/login" component={LoginPage} />
    <ProtectedRoute path="/metrics/new" component={CreateMetricPage} />
    <ProtectedRoute path="/metrics/:id/edit" component={EditMetricPage} />
    <ProtectedRoute path="/metrics/:id" component={MetricAnalysisPage} />
    <ProtectedRoute path="/analyses/new" component={CreateAnalysisPage} />
    <ProtectedRoute path="/analyses/:id" component={AnalysisPage} />
    <ProtectedRoute path="/analyses" component={AnalysesListPage} />
    <ProtectedRoute path="/settings" component={SettingsPage} />
    <ProtectedRoute path="/" component={HomePage} />
  </Switch>
);
