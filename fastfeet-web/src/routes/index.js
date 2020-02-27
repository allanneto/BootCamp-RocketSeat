import React from 'react';
import { Switch } from 'react-router-dom';

import Delivery from '~/pages/Delivery';
import Deliveryman from '~/pages/Deliveryman';
import Problems from '~/pages/Problems';
import Recipients from '~/pages/Recipients';
import SingIn from '~/pages/SingIn';

import Route from './Route';

export default function Routes() {
	return (
		<Switch>
			<Route path="/" exact component={SingIn} />

			<Route path="/delivery" exact component={Delivery} isPrivate />
			<Route path="/recipient" exact component={Recipients} isPrivate />
			<Route path="/deliveryman" exact component={Deliveryman} isPrivate />
			<Route path="/problem" exact component={Problems} isPrivate />
		</Switch>
	);
}
