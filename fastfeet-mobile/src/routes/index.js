import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PropTypes from 'prop-types';

import SignIn from '~/pages/SignIn';

import DashboardRoute from './Dashboard.routes';

const Stack = createStackNavigator();

export default function Routes({ signed }) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#7D40E7' },
          headerTintColor: '#fff',
        }}
      >
        {!signed ? (
          <Stack.Screen
            name="SignIn"
            options={{ headerShown: false }}
            component={SignIn}
          />
        ) : (
          <Stack.Screen
            name="Dashboard"
            options={{ headerShown: false }}
            component={DashboardRoute}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

Routes.propTypes = {
  signed: PropTypes.bool.isRequired,
};
