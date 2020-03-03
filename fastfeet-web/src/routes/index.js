import React from 'react';
import { Switch } from 'react-router-dom';

import Delivery from '~/pages/Delivery';
import DeliveryForm from '~/pages/Delivery/Form';
import Deliveryman from '~/pages/Deliveryman';
import DeliverymanForm from '~/pages/Deliveryman/Form';
import Problems from '~/pages/Problems';
import Recipient from '~/pages/Recipient';
import RecipientForm from '~/pages/Recipient/Form';
import SingIn from '~/pages/SingIn';

import Route from './Route';

export default function Routes() {
	return (
		<Switch>
			<Route path="/" exact component={SingIn} />

			<Route path="/delivery" exact component={Delivery} isPrivate />
			<Route path="/delivery/form" exact component={DeliveryForm} isPrivate />
			<Route
				path="/delivery/form/:id"
				exact
				component={DeliveryForm}
				isPrivate
			/>

			<Route path="/deliveryman" exact component={Deliveryman} isPrivate />
			<Route
				path="/deliveryman/form"
				exact
				component={DeliverymanForm}
				isPrivate
			/>
			<Route
				path="/deliveryman/form/:id"
				exact
				component={DeliverymanForm}
				isPrivate
			/>

			<Route path="/recipient" exact component={Recipient} isPrivate />
			<Route path="/recipient/form" exact component={RecipientForm} isPrivate />
			<Route
				path="/recipient/form/:id"
				exact
				component={RecipientForm}
				isPrivate
			/>

			<Route path="/problem" exact component={Problems} isPrivate />
		</Switch>
	);
}
