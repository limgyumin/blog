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
import SearchPage from "../pages/SearchPage";

const App = () => {
  return (
    <div className="App">
      <ToastContainer autoClose={4000} />
      <Route
        render={({ location }) => {
          let path = location.pathname.split("/")[1];
          return (
            path !== "write" &&
            path !== "modify" &&
            path !== "success" && (
              <>
                <HeaderContainer />
                {/* <SideBarContainer /> */}
              </>
            )
          );
        }}
      />
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/categories" component={CategoriesPage} />
        <Route path="/post/:idx" component={PostPage} />
        <Route path="/modify/:idx" component={HandlePage} />
        <Route path="/write" component={HandlePage} />
        <Route path="/search" component={SearchPage} />
        <Route path="/success" component={LoginPage} />
      </Switch>
    </div>
  );
};

export default App;
