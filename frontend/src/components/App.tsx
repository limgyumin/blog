import React from "react";
import "styles/theme.scss";
import { Route, Switch } from "react-router-dom";
import useTheme from "hooks/util/useTheme";
import Header from "./common/Header";
import RestrictRoute from "./Route/RestrictRoute";
import * as Pages from "pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { isLight } = useTheme();

  return (
    <div className={`App ${isLight ? "light" : "dark"}`}>
      <ToastContainer autoClose={4000} />
      <Route
        render={({ location }) => {
          const path = location.pathname.split("/")[1];
          return (
            <React.Fragment>
              {path !== "write" && path !== "update" && path !== "auth" && <Header />}
              <Switch>
                <Route exact path="/" render={() => <Pages.Main />} />
                <Route path="/categories" render={() => <Pages.Categories />} />
                <Route path="/post/:idx" render={() => <Pages.Post />} />
                <RestrictRoute path="/write" render={() => <Pages.Handle />} />
                <RestrictRoute path="/update/:idx" render={() => <Pages.Handle />} />
                <Route path="/search" render={() => <Pages.Search />} />
                <Route path="/auth" render={() => <Pages.Auth />} />
                <RestrictRoute path="/temp" render={() => <Pages.Temp />} />
                <Route path="/members" render={() => <Pages.Members />} />
                <Route exact path="/about" render={() => <Pages.About />} />
              </Switch>
            </React.Fragment>
          );
        }}
      />
    </div>
  );
};

export default App;
