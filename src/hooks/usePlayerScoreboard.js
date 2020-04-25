import { useSelector } from 'react-redux';


const usePlayerScoreBoard = () => {
  const players = useSelector(state => state.players.allPlayers);
  return [...players].sort((prev, next) => next.score - prev.score);
};

export default usePlayerScoreBoard;
