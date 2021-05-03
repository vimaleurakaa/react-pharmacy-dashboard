import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import SM_Home from '../pages/sm/Home';

const App = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={Login} />
				<Route exact path="/store-manager" component={SM_Home} />
				<Route path="/store-manager/:id" component={SM_Home} />
			</Switch>
		</Router>
	);
};

export default App;
