import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'query-string';
import { Redirect } from 'react-router';
import useGameRoom from '../hooks/useGameRoom';
import { updateCurrentRound } from '../state/currentRound/action';
import { notifyPlayersOfGameEnd } from '../state/gameRoom/action';

const getNextRound = (rounds, currentRound) => {
  if (!currentRound || !currentRound.id) {
    return rounds[0];
  }

  const currentRoundIndex = rounds.findIndex(round => round.id === currentRound.id);

  if (currentRoundIndex >= rounds.length) {
    return null;
  }

  return rounds[currentRoundIndex + 1];
};

const findRoundById = (rounds, roundId) => rounds.find(round => round.id === roundId) || null;

const getRequestedRoundId = (location) => {
  const params = qs.parse(location.search);
  return params.roundId || null;
};

/**
 * You should land on LoadRoundPage if you have no current round,
 * or need to change round to another.
 * */
const LoadRoundPage = ({ location }) => {
  const dispatch = useDispatch();
  const gameRoom = useGameRoom();
  const currentRound = useSelector(state => state.currentRound);
  const [redirectTo, setRedirectTo] = useState(null);

  const requestedRoundId = getRequestedRoundId(location);

  const rounds = gameRoom?.room?.gameMode?.rounds ?? [];

  useEffect(() => {
    if (rounds.length < 1) {
      return;
    }

    const { round } = currentRound;

    let nextRound = requestedRoundId
      ? findRoundById(rounds, requestedRoundId)
      : getNextRound(rounds, round);

    // If we cannot find the requested round,
    // should we just select the next available
    if (!nextRound && requestedRoundId) {
      console.warn(`Requested round: ${requestedRoundId}, but none matching did exist in rounds. Defaulting to the first available`);
      nextRound = getNextRound(rounds, round);
    }

    // We are apparently done with our game and should
    // be redirected to the lobby
    if (!nextRound) {
      dispatch(notifyPlayersOfGameEnd());
      setRedirectTo('/lobby');
      return;
    }

    dispatch(updateCurrentRound({ round: nextRound }));
    setRedirectTo('/round/task/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rounds.length]);

  // This page should not be accessed if not game-room has been loaded already
  const roomId = gameRoom?.room?.id;

  if (!roomId) {
    return <Redirect to="/"/>;
  }

  if (redirectTo) {
    return <Redirect to={redirectTo}/>;
  }

  return <section>
    <h2>Loading round...</h2>
  </section>;
};

LoadRoundPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default LoadRoundPage;
