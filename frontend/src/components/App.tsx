import React from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";
import PostPage from "../pages/PostPage";

const App = () => {
  return (
    <div className="App">
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/success" component={LoginPage} />
        <Route path="/post/:idx" component={PostPage} />
      </Switch>
    </div>
  );
};

export default App;
