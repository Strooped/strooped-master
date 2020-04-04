import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RegisterGameRoom from './page/RegisterGameRoom';

// Suspense is used by react-i18next when translations are not ready
const App = () => <BrowserRouter>
  <Switch>
    <Route path="/" component={RegisterGameRoom}/>
  </Switch>
</BrowserRouter>;

export default App;
