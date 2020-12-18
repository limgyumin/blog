import React from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";
import PostPage from "../pages/PostPage";
import WritePage from "../pages/WritePage";

const App = () => {
  return (
    <div className="App">
      <ToastContainer autoClose={4000} />
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/success" component={LoginPage} />
        <Route path="/post/:idx" component={PostPage} />
        <Route path="/write" component={WritePage} />
        <Route path="/modify/:idx" component={WritePage} />
      </Switch>
    </div>
  );
};

export default App;
