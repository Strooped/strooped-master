import {
  put,
  call,
  takeLatest,
} from 'redux-saga/effects';
import { CURRENT_TASK_UPDATE_FAILURE, CURRENT_TASK_UPDATE_REQUESTED, CURRENT_TASK_UPDATE_SUCCESS } from './action';
import { getColorQuestion } from './colorSelector';

function* changeTask(action) {
  const { task } = action.payload;
  console.info(`Changing task to: (${task.id}, ${task.correctAnswer})`);

  try {
    const question = yield call(getColorQuestion, task);

    yield put({
      type: CURRENT_TASK_UPDATE_SUCCESS,
      payload: Object.assign(question, { id: task.id }),
    });
  } catch (error) {
    console.error('Failed to build question for color', error);
    yield put({ error, type: CURRENT_TASK_UPDATE_FAILURE });
  }
}


export default function* watchTaskChange() {
  yield takeLatest(CURRENT_TASK_UPDATE_REQUESTED, changeTask);
}
