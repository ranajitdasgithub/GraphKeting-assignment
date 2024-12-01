import * as types from "./actionType";
import axios from "axios";

const url = "http://localhost:4000";

const LoginAction = (payload) => (dispatch) => {
  dispatch({ type: types.LOGIN_REQUEST });
  return axios({
    method: "post",
    url: "/user/login",
    baseURL: url,
    data: payload,
  })
    .then((r) =>
      dispatch({
        type: types.LOGIN_SUCCESS,
        payload: { token: r.data.token, user: r.data.user },
      })
    )

    .catch((e) => dispatch({ type: types.LOGIN_FAILED }));
};

const LogoutAction = (params) => (dispatch) => {
  dispatch({ type: types.LOGOUT_REQUEST });

  try {
    return dispatch({ type: types.LOGOUT_SUCCESS });
  } catch (err) {
    return dispatch({ type: types.LOGOUT_FAILED, payload: err });
  }
};

export { LoginAction, LogoutAction };
