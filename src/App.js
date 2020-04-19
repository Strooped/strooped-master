import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CurrentTaskPage from './page/CurrentTaskPage';
import LoadRoundPage from './page/LoadRoundPage';
import LoadTaskPage from './page/LoadTaskPage';
import LobbyPage from './page/LobbyPage';
import RegisterGameRoom from './page/RegisterGameRoom';

// Suspense is used by react-i18next when translations are not ready
const App = () => <BrowserRouter>
  <Switch>
    <Route exact path="/" component={RegisterGameRoom}/>
    <Route exact path="/lobby" component={LobbyPage}/>
    <Route exact path="/round/task/:taskId" component={CurrentTaskPage}/>
    <Route exact path="/round/task" component={LoadTaskPage}/>
    <Route exact path="/round/" component={LoadRoundPage}/>
  </Switch>
</BrowserRouter>;

export default App;
