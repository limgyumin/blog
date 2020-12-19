import React from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";
import PostPage from "../pages/PostPage";
import HandlePage from "../pages/HandlePage";

const App = () => {
  return (
    <div className="App">
      <ToastContainer autoClose={4000} />
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/success" component={LoginPage} />
        <Route path="/post/:idx" component={PostPage} />
        <Route path="/write" component={HandlePage} />
        <Route path="/modify/:idx" component={HandlePage} />
      </Switch>
    </div>
  );
};

export default App;
