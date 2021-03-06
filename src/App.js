import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CurrentTaskPage from './page/CurrentTaskPage';
import GameCompletedPage from './page/GameCompletedPage';
import IntermediateScorePage from './page/IntermediateScorePage';
import LoadRoundPage from './page/LoadRoundPage';
import LoadTaskPage from './page/LoadTaskPage';
import RegisterGameRoom from './page/RegisterGameRoom';
import GameLobbyPage from './page/GameLobbyPage';

// Suspense is used by react-i18next when translations are not ready
const App = () => <BrowserRouter>
  <Switch>
    <Route exact path="/" component={RegisterGameRoom}/>
    <Route exact path="/lobby/" component={GameLobbyPage}/>
    <Route exact path="/round/task/:taskId" component={CurrentTaskPage}/>
    <Route exact path="/round/task" component={LoadTaskPage}/>
    <Route exact path="/round/" component={LoadRoundPage}/>
    <Route exact path="/round/scoreboard" component={IntermediateScorePage}/>
    <Route exact path="/scoreboard" component={GameCompletedPage}/>
  </Switch>
</BrowserRouter>;

export default App;
