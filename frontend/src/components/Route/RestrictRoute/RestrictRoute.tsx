import useFetchProfile from "hooks/user/useFetchProfile";
import React, { FC } from "react";
import { Redirect, Route, RouteComponentProps } from "react-router";

type RestrictRouteProps = {
  exact?: boolean;
  path: string;
  render: (props?: RouteComponentProps) => React.ReactNode;
};

const RestrictRoute: FC<RestrictRouteProps> = ({ exact, path, render }) => {
  const { profile, admin } = useFetchProfile();

  return (
    <Route
      exact={exact}
      path={path}
      render={() => {
        return profile.id && admin ? render() : <Redirect to="/" />;
      }}
    />
  );
};

export default RestrictRoute;
