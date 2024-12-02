import axios from "axios";
import * as types from "./actionType";

// Base API URL
const API_URL = "https://graph-keting-assignment.vercel.app/";

// Function to get the token from sessionStorage
const getAuthToken = () => {
  return sessionStorage.getItem("tokenKey");
};

export const createTask = (taskData) => async (dispatch) => {
  dispatch({ type: types.CREATE_TASK_REQUEST });
  try {
    const token = getAuthToken();
    const response = await axios.post(`${API_URL}/create`, taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: types.CREATE_TASK_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.CREATE_TASK_FAILURE, payload: error.message });
  }
};

// Get All Tasks
export const getTasks = () => async (dispatch) => {
  dispatch({ type: types.GET_TASKS_REQUEST });
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_URL}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("res", response.data);

    dispatch({ type: types.GET_TASKS_SUCCESS, payload: response.data.data });
  } catch (error) {
    dispatch({ type: types.GET_TASKS_FAILURE, payload: error.message });
  }
};

// Get Task by ID
export const getTaskById = (taskId) => async (dispatch) => {
  dispatch({ type: types.GET_TASK_BY_ID_REQUEST });
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_URL}/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: types.GET_TASK_BY_ID_SUCCESS, payload: response.id });
  } catch (error) {
    dispatch({ type: types.GET_TASK_BY_ID_FAILURE, payload: error.message });
  }
};

// Update Task
export const updateTask = (taskId, taskData) => async (dispatch) => {
  dispatch({ type: types.UPDATE_TASK_REQUEST });
  try {
    const token = getAuthToken();
    const response = await axios.put(`${API_URL}/edit/${taskId}`, taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: types.UPDATE_TASK_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.UPDATE_TASK_FAILURE, payload: error.message });
  }
};

// Delete Task
export const deleteTask = (taskId) => async (dispatch) => {
  dispatch({ type: types.DELETE_TASK_REQUEST });
  try {
    const token = getAuthToken();
    await axios.delete(`${API_URL}/delete/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: types.DELETE_TASK_SUCCESS, payload: taskId });
  } catch (error) {
    dispatch({ type: types.DELETE_TASK_FAILURE, payload: error.message });
  }
};
