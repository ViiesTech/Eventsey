import React, { useEffect } from 'react';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import Routes from './src/routes/Routes';

const App = () => {
  useEffect(() => {
    // hide nav bar when app loads
    SystemNavigationBar.stickyImmersive();
  }, []);
  return <Routes />;
};

export default App;
