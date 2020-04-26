import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { joinGameRoom } from '../state/gameRoom/action';

/**
 * React hook which attempts to connect to a room
 * by its joinPin. roomId is used to retrieve details
 * about the room, which is also required on the initial loading of a game-room.
 *
 * It returns the gameRoom with metadata such as isLoading and error.
 * */
const useGameRoom = ({ joinPin, roomId = null } = {}) => {
  const dispatch = useDispatch();
  const {
    room = {},
    error,
    isLoading,
  } = useSelector(state => state.gameRoom);
  const history = useHistory();

  const storedJoinPin = room.joinPin;

  useEffect(() => {
    // We have no means of connecting to socket
    // and should send the user back to the landing-page
    if (!joinPin && !storedJoinPin) {
      // eslint-disable-next-line no-console
      console.warn('We have no means of connecting to the socket. Redirecting to /');
      console.info(room);
      history.push('/');
      return;
    }

    // Do nothing more if we are loading our current action
    if (isLoading) {
      return;
    }

    if (room && !!storedJoinPin && storedJoinPin === joinPin) {
      console.info(`Client is already connected to room with pin: ${joinPin}`);
      return;
    }

    // We could potentially be connected to another room
    // with different pin
    if (room.roomId) {
      console.warn(`Client is connected to another gameRoom (connectedPin: ${storedJoinPin}, expectedPin: ${joinPin}`);
    }

    dispatch(joinGameRoom({ joinPin, roomId }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [joinPin]);

  return { room, error, isLoading };
};


export default useGameRoom;
