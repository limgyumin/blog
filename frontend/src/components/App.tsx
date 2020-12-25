import React from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";
import PostPage from "../pages/PostPage";
import HandlePage from "../pages/HandlePage";
import CategoriesPage from "../pages/CategoriesPage";
import HeaderContainer from "../containers/Header/HeaderContainer";
import SideBarContainer from "../containers/SideBar/SideBarContainer";

const App = () => {
  return (
    <div className="App">
      <ToastContainer autoClose={4000} />
      <Route
        render={({ location }) =>
          location.pathname.split("/")[1] !== "write" &&
          location.pathname.split("/")[1] !== "modify" && (
            <>
              <HeaderContainer />
              <SideBarContainer />
            </>
          )
        }
      />
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/categories" component={CategoriesPage} />
        <Route path="/post/:idx" component={PostPage} />
        <Route path="/modify/:idx" component={HandlePage} />
        <Route path="/write" component={HandlePage} />
        <Route path="/success" component={LoginPage} />
      </Switch>
    </div>
  );
};

export default App;
