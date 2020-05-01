import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/loginForm";
import BlogForm from "./components/blogForm";
import Togglable from "./components/toggalable";
import Notification from "./components/Notification";
import { initializeBlogs } from "./reducers/blogReducer";
import { useDispatch } from "react-redux";
import Users from "./components/Users";
import User from "./components/User";
import Singleblog from "./components/Singleblog";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const addBlog = blogObject => {
    blogFormRef.current.toggleVisibility();
    blogService.create(blogObject).then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog));
    });
  };

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  useEffect(() => {
    blogService.getAll().then(blogs => dispatch(initializeBlogs(blogs)));
  }, [dispatch]);

  //useEffect(() => {
  //  dispatch(initializeBlogs());
  //}, [dispatch]);

  const handleLogout = async event => {
    event.preventDefault();
    window.localStorage.removeItem("loggedBlogappUser");
    window.location.reload();
  };

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? "none" : "" };
    const showWhenVisible = { display: loginVisible ? "" : "none" };

    return (
      <div>
        <div style={hideWhenVisible}>
          <Button variant="contained" onClick={() => setLoginVisible(true)}>
            log in
          </Button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <Button variant="contained" onClick={() => setLoginVisible(false)}>
            cancel
          </Button>
        </div>
      </div>
    );
  };

  const blogFormRef = React.createRef();

  const blogForm = () => (
    <Togglable buttonLabel="new post" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  );

  //  const Notification = () => {
  //    return (
  //      <div className="error">
  //        <p>Sorry, there was an error</p>
  //      </div>
  //    );
  //  };

  const padding = {
    padding: 5
  };

  return (
    <Container>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
            ></IconButton>
            <Button color="inherit">
              <Link style={padding} to="/users">
                Users
              </Link>
            </Button>
            <Button color="inherit">
              <Link style={padding} to="/blogs">
                Blogs
              </Link>
            </Button>
            <Button color="inherit">
              {user ? (
                <em>{user.username} logged in</em>
              ) : (
                <Link style={padding} to="/login">
                  login
                </Link>
              )}
            </Button>
          </Toolbar>
        </AppBar>
        <div>
          <h1>Blogposts</h1>
          <Notification message={errorMessage} />
          {user === null ? (
            loginForm()
          ) : (
            <div>
              <button onClick={handleLogout}>logout</button> {blogForm()}
            </div>
          )}

          <Switch>
            <Route path="/blogs/:id">
              <Singleblog />
            </Route>
            <Route path="/blogs">
              <Blog />
            </Route>
          </Switch>
          <Switch>
            <Route path="/users/:id">
              <User />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
          </Switch>
        </div>
      </Router>
    </Container>
  );
};

export default App;
