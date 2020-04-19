import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';

import PinPresenter from '../components/PinPresenter';
import { notifyStartGame } from '../state/player/action';
import ListPlayers from '../components/ListPlayers';

const GameLobby = () => {
  const dispatch = useDispatch();
  const joinPin = '223455';
  const { allPlayers = [] } = useSelector(state => state.players);

  if (!joinPin) {
    return <Redirect to={'/'} />;
  }

  // eslint-disable-next-line consistent-return
  const HandleStartGame = () => {
    if (allPlayers) {
      dispatch(notifyStartGame());
      // Add delay before starting
      return <Redirect to="/round/"/>;
    }
  };

  return (
    <div className="stropped-screen__container">
      <div className="lobby__container">
        <div className="lobby__content">
          <div className="lobby-main__content">
            <PinPresenter pin={joinPin}/>
            <div className="player-list__container">
              <div className="player-list-header__wrapper">
                <span>Players</span>
                {allPlayers && <ListPlayers players={allPlayers}/>}
              </div>
            </div>
          </div>
          <button className="button is-link is-fullwidth" onClick={HandleStartGame} type="button">Start game</button>
        </div>
      </div>
    </div>
  );
};

export default GameLobby;
