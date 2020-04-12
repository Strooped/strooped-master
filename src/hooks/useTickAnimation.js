import { useEffect, useState } from 'react';

const TICK_ANIMATION_DURATION_MS = 200;

/**
 * This hook helps to implement "ticking"-animation (like the movement of a clock),
 * which activates when the trigger changes.
 * */
const useTickAnimation = ({ trigger }) => {
  const [isAnimationActive, setAnimateChange] = useState(false);

  useEffect(() => {
    setAnimateChange(true);

    const timeout = setTimeout(() => {
      setAnimateChange(false);
    }, TICK_ANIMATION_DURATION_MS);

    return () => clearTimeout(timeout);
  }, [trigger]);

  return { isAnimationActive };
};

export default useTickAnimation;
