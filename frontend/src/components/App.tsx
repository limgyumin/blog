import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginContainer from "../containers/Login/LoginContainer";
import MainPage from "../pages/MainPage";
import Modal from "./common/Modal";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={MainPage} />
      </Switch>
      <LoginContainer />
    </div>
  );
};

export default App;
