import React from 'react';
import { Switch } from 'react-router-dom';

import Delivery from '~/pages/Delivery';
import SingIn from '~/pages/SingIn';

import Route from './Route';

export default function Routes() {
	return (
		<Switch>
			<Route path="/" exact component={SingIn} />

			<Route path="/deliveries" exact component={Delivery} isPrivate />
		</Switch>
	);
}
