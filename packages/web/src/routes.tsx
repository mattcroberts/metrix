import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AnalysesListPage } from './pages/analyses';
import { CreateAnalysisPage } from './pages/analyses/create';
import { EditAnalysisPage } from './pages/analyses/edit';
import { MetricAnalysisPage } from './pages/analyses/metric';
import { AnalysisPage } from './pages/analyses/view';
import { HomePage } from './pages/home';
import { LoginPage } from './pages/login';
import { CreateMetricPage } from './pages/metric/create';
import { EditMetricPage } from './pages/metric/edit';
import { NotFoundPage } from './pages/NotFound';
import { SettingsPage } from './pages/settings';

export const Routes = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <ProtectedRoute exact path="/metrics/new" component={CreateMetricPage} />
    <ProtectedRoute exact path="/metrics/:id/edit" component={EditMetricPage} />
    <ProtectedRoute exact path="/metrics/:id" component={MetricAnalysisPage} />
    <ProtectedRoute exact path="/analyses/new" component={CreateAnalysisPage} />
    <ProtectedRoute exact path="/analyses/:id/edit" component={EditAnalysisPage} />
    <ProtectedRoute exact path="/analyses/:id" component={AnalysisPage} />
    <ProtectedRoute exact path="/analyses" component={AnalysesListPage} />
    <ProtectedRoute exact path="/settings" component={SettingsPage} />
    <ProtectedRoute exact path="/" component={HomePage} />
    <Route component={NotFoundPage} />
  </Switch>
);
