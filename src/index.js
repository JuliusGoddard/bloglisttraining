import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import blogReducer, { initializeBlogs } from "./reducers/blogReducer";
import blogService from "./services/blogs";
import loginReducer, { initializeLogin } from "./reducers/loginReducer";
import loginService from "./services/login";
import usersReducer, { initializeUsers } from "./reducers/usersReducer";
import usersService from "./services/users";

const reducer = combineReducers({
  blogs: blogReducer,
  login: loginReducer,
  users: usersReducer
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

blogService.getAll().then(blogs => store.dispatch(initializeBlogs(blogs)));

loginService.getAll().then(login => store.dispatch(initializeLogin(login)));

usersService.getAll().then(users => store.dispatch(initializeUsers(users)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
