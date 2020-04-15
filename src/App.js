import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import PinPresenter from './components/PinPresenter';
import Button from './components/Button';
import ListPlayers from './components/ListPlayers';

const players = [
  'fredrik',
  'didrik',
  'ingrid',
  'erik',
  'håvard',
  'mikkel',
  'bfgf',
  'gfdgf',
];

// Suspense is used by react-i18next when translations are not ready
const App = () => <BrowserRouter>
    <Layout>
      <div className="lobby__container">
        <div className="lobby__content">
          <div className="lobby-main__content">
            <PinPresenter pin={4343435}/>
            <div className="player-list__container">
              <div className="player-list-header__wrapper">
                <span>Joined</span>
              </div>
              <ListPlayers players={players}/>
            </div>
          </div>
          <Button text="Start Game" />
        </div>
      </div>
    </Layout>
</BrowserRouter>;

export default App;
