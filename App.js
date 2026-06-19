import React, { Fragment, useEffect } from 'react';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import Routes from './src/routes/Routes';
import Toast from 'react-native-toast-message';

const App = () => {
  useEffect(() => {
    SystemNavigationBar.stickyImmersive();
  }, []);
  return (
    <Fragment>
      <Routes />
      <Toast />
    </Fragment>
  );
};

export default App;
