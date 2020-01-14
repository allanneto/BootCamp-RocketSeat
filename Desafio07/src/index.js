import React from 'react';
import { StatusBar } from 'react-native';

import Routes from './routes';
import NavigationService from './services/navigation';

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Routes
        ref={navigatorRef => NavigationService.setNavigator(navigatorRef)}
      />
    </>
  );
}
