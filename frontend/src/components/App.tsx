import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginSuccessPage from "../pages/LoginSuccessPage";
import MainPage from "../pages/MainPage";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/success" component={LoginSuccessPage} />
      </Switch>
    </div>
  );
};

export default App;
