import React, { Fragment, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Header from '../components/layout/Header';
import Home from '../components/Home';
import Register from '../components/auth/Register';
import Login from '../components/auth/Login';
import FileNotFound from './../components/FileNotFound';
import Dashboard from '../components/Dashboard';
import Project from '../components/Project';
import NewProject from '../components/NewProject';
import Profile from '../components/Profile';
import Footer from '../components/layout/Footer';
import Alert from '../components/layout/Alert';

import { Provider } from 'react-redux';
import setAuthToken from '../utils/setAuthToken';
import { loadUser } from '../actions/auth';
import store from '../store';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const AppRouter = () => {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	return (
		<Provider store={store}>
			<BrowserRouter>
				<Fragment>
					<Header />
					<Alert />
					<Switch>
						<Route exact path='/' component={Home} />
						<Route exact path='/register' component={Register} />
						<Route exact path='/login' component={Login} />
						<PrivateRoute exact path='/dashboard' component={Dashboard} />
						<PrivateRoute exact path='/project' component={Project} />
						<PrivateRoute exact path='/new-project' component={NewProject} />
						<PrivateRoute exact path='/profile' component={Profile} />
						<Route component={FileNotFound} />
					</Switch>
					<Footer />
				</Fragment>
			</BrowserRouter>
		</Provider>
	);
};

export default AppRouter;
