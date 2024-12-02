import * as types from "./actionType";

const initialState = {
  tasks: [],
  task: null,
  isLoading: false,
  isError: false,
  errorMessage: "",
};

const taskReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    // Create Task
    case types.CREATE_TASK_REQUEST:
      return { ...state, isLoading: true, isError: false };

    case types.CREATE_TASK_SUCCESS:
      return { ...state, isLoading: false, tasks: [...state.tasks, payload.data] };

    case types.CREATE_TASK_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: payload,
      };

    // Get All Tasks
    case types.GET_TASKS_REQUEST:
      return { ...state, isLoading: true, isError: false };

    case types.GET_TASKS_SUCCESS:
      return { ...state, isLoading: false, tasks: payload };

    case types.GET_TASKS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: payload,
      };

    // Get Task by ID
    case types.GET_TASK_BY_ID_REQUEST:
      return { ...state, isLoading: true, isError: false };

    case types.GET_TASK_BY_ID_SUCCESS:
      return { ...state, isLoading: false, task: payload };

    case types.GET_TASK_BY_ID_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: payload,
      };

    // Update Task
    case types.UPDATE_TASK_REQUEST:
      return { ...state, isLoading: true, isError: false };

    case types.UPDATE_TASK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        tasks: state.tasks.map((task) =>
          task._id === payload._id ? payload : task
        ),
      };

    case types.UPDATE_TASK_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: payload,
      };

    // Delete Task
    case types.DELETE_TASK_REQUEST:
      return { ...state, isLoading: true, isError: false };

    case types.DELETE_TASK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        tasks: state.tasks.filter((task) => task._id !== payload),
      };

    case types.DELETE_TASK_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: payload,
      };

    default:
      return state;
  }
};

export { taskReducer };
