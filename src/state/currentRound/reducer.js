import {
  CURRENT_ROUND_UPDATE,
  CURRENT_TASK_UPDATE_FAILURE,
  CURRENT_TASK_UPDATE_REQUESTED,
  CURRENT_TASK_UPDATE_SUCCESS,
} from './action';


const initialState = {
  round: null,
  currentTask: null,
  isLoading: false,
  error: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CURRENT_TASK_UPDATE_REQUESTED:
      return {
        ...state,
        currentTask: null,
        isLoading: true,
      };
    case CURRENT_TASK_UPDATE_SUCCESS:
      return {
        ...state,
        currentTask: action.payload,
        isLoading: false,
        error: null,
      };
    case CURRENT_TASK_UPDATE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case CURRENT_ROUND_UPDATE:
      return {
        ...state,
        round: action.payload,
        currentTask: null,
        error: null,
      };
    default:
      return state;
  }
}
