import * as types from "./actionType";

const initState = {
  isAuth: sessionStorage.getItem("tokenKey") ? true : false,
  isLoading: false,
  isError: false,
  userName: "",
  userId: "",
  token: sessionStorage.getItem("tokenKey") || "",
  logOutError: false,
};

const reducer = (oldState = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.LOGIN_REQUEST:
      return {
        ...oldState,
        isLoading: true,
      };

    case types.LOGIN_SUCCESS:
      sessionStorage.setItem("tokenKey", JSON.stringify(payload.token));
      return {
        ...oldState,
        isAuth: true,
        token: payload.token,
        userName: payload.user.name,
        userId: payload.user.id,
        isLoading: false,
        isError: false,
      };

    case types.LOGIN_FAILED:
      return {
        ...oldState,
        isAuth: false,
        isLoading: false,
        isError: true,
      };

    case types.LOGOUT_SUCCESS:
      sessionStorage.removeItem("tokenKey");
      return {
        ...oldState,
        isAuth: false,
        isError: false,
        token: "",
        userName: "",
        userId: "",
      };

    case types.LOGOUT_FAILED:
      return {
        ...oldState,
        logOutError: payload,
      };

    default:
      return oldState;
  }
};

export { reducer };
