import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { joinGameRoom } from '../state/gameRoom/action';

/**
 * React hook which attempts to connect to a room
 * by its joinPin.
 *
 * It returns the gameRoom,
 * with metadata such as isLoading and error.
 * */
const useGameRoom = ({ joinPin, roomId = null } = {}) => {
  const dispatch = useDispatch();
  const {
    room = {},
    error,
    isLoading,
  } = useSelector(state => state.gameRoom);

  const storedJoinPin = room.joinPin;

  useEffect(() => {
    // In cases where we have no means of connecting to a game
    if (!joinPin && !storedJoinPin) {
      console.info(room);
      // eslint-disable-next-line no-console
      console.debug('No joinPin provided, skipping connection...');
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
