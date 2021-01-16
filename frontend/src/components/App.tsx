import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthPage from "../pages/AuthPage";
import MainPage from "../pages/MainPage";
import PostPage from "../pages/PostPage";
import HandlePage from "../pages/HandlePage";
import CategoriesPage from "../pages/CategoriesPage";
import HeaderContainer from "../containers/Header/HeaderContainer";
import SideBarContainer from "../containers/SideBar/SideBarContainer";
import SearchPage from "../pages/SearchPage";
import TempPage from "../pages/TempPage";
import MemberPage from "../pages/MemberPage";
import "../util/theme.scss";
import { observer } from "mobx-react";
import useStore from "../util/lib/hooks/useStore";

const App = () => {
  const { store } = useStore();
  const { theme, handleThemeState } = store.ThemeStore;

  const validateTheme = () => {
    const currentTheme = localStorage.getItem("theme");
    if (!currentTheme || currentTheme === "light") {
      handleThemeState(false);
    } else {
      handleThemeState(true);
    }
  };

  useEffect(() => {
    validateTheme();
  }, []);

  return (
    <div className={`App ${!theme ? "light" : "dark"}`}>
      <ToastContainer autoClose={4000} />
      <Route
        render={({ location }) => {
          let path = location.pathname.split("/")[1];
          return (
            path !== "write" &&
            path !== "modify" &&
            path !== "auth" && (
              <>
                <HeaderContainer />
                <SideBarContainer />
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
        <Route path="/auth" component={AuthPage} />
        <Route path="/temp" component={TempPage} />
        <Route path="/members" component={MemberPage} />
      </Switch>
    </div>
  );
};

export default observer(App);
