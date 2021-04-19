import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import {
	NotificationContainer,

} from 'react-notifications';

import 'react-notifications/lib/notifications.css';
  
import Navbar from './component/Layouts/Navbar';

import Home from './component/Home';

import Login from './component/Login';

import Register from './component/Register';

import Todo from './component/Todos';

import Admin from './component/Admin';

import PrivateRoute from './hoc/PrivateRoute';

import UnPrivatRoute from './hoc/UnPrivatRoute';

function App() {
	
	return (
		<Router>
			<Navbar />
			<Switch>
				<Route exact path='/' component={Home} />
				<UnPrivatRoute exact path='/login' component={Login} />
				<UnPrivatRoute exact path='/register' component={Register} />
				<PrivateRoute path='/todos' roles={['user', 'admin']} component={Todo} />
				{/* <PrivateRoute path='/admin' roles={['admin']} component={Admin} /> */}
				<Route path='/admin' component={Admin} />
			</Switch>
			<NotificationContainer />
		</Router>
	);
}

export default App;
