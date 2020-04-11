import { useState, useEffect } from 'react';

const SECOND_IN_MS = 1000;

/**
 * Live timer updates its state each second,
 * and returns how much time it is left and if it is completed.
 * */
const useLiveTimer = ({ timeoutMs, shouldStart = false }) => {
  const [timeLeft, setTimeLeft] = useState(timeoutMs);

  useEffect(() => {
    if (!shouldStart) {
      return () => {
      };
    }

    let interval = setInterval(() => {
      setTimeLeft(timeLeft - SECOND_IN_MS);
    }, SECOND_IN_MS);

    // No point in keeping the timer when we are completed
    if (timeLeft <= 0) {
      clearInterval(interval);
      interval = null;
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timeLeft, shouldStart]);

  return {
    timeLeft,
    isStarted: shouldStart,
    isCompleted: timeLeft <= 0,
  };
};

export default useLiveTimer;
