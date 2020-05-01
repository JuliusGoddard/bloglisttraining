import loginService from "../services/login";
import blogService from "../services/blogs";

const loginReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_LOGIN":
      return action.data;
    case "SET_TOKEN":
      return state;
    default:
      return state;
  }
};

export const setToken = token => {
  return async dispatch => {
    await blogService.setToken(token);
    dispatch({
      type: "SET_TOKEN"
    });
  };
};

export const initializeLogin = login => {
  return async dispatch => {
    const login = await loginService.getAll();
    dispatch({
      type: "INIT_LOGIN",
      data: login
    });
  };
};

export default loginReducer;
