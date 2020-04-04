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
const useGameRoom = ({ joinPin }) => {
  const dispatch = useDispatch();
  const {
    room,
    error,
    isLoading,
    joinPin: storedJoinPin,
  } = useSelector(state => state.gameRoom);

  useEffect(() => {
    if (!joinPin) {
      // eslint-disable-next-line no-console
      console.debug('No joinPin provided, skipping connection...');
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

    dispatch(joinGameRoom(joinPin));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [joinPin]);

  return { room, error, isLoading };
};


export default useGameRoom;
