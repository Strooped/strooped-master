

export const getNextRound = (rounds, currentRound) => {
  if (!currentRound || !currentRound.id) {
    return rounds[0];
  }

  const currentRoundIndex = rounds.findIndex(round => round.id === currentRound.id);

  if (currentRoundIndex >= rounds.length) {
    return null;
  }

  return rounds[currentRoundIndex + 1];
};

export const findRoundById = (rounds, roundId) => rounds
  .find(round => round.id === roundId) || null;

export const findTaskById = (tasks, taskId) => tasks.find(task => task.id === taskId) || null;

export const getNextTask = (tasks, currentTask) => {
  if (!currentTask) {
    return tasks[0];
  }

  const currentTaskIndex = tasks.findIndex(task => task.id === currentTask.id);

  if (currentTaskIndex < 0 || currentTaskIndex === undefined) {
    return tasks[0];
  }

  if (currentTaskIndex >= tasks.length) {
    return null;
  }

  return tasks[currentTaskIndex + 1];
};
