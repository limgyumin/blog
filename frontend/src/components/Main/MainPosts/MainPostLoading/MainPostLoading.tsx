import React from "react";
import "./MainPostLoading.scss";
import ReactLoading from "react-loading";

interface MainPostLoadingProps {}

const MainPostLoading = ({}: MainPostLoadingProps) => {
  return (
    <>
      <div className="Main-Post-Loading">
        <div className="Main-Post-Loading-Wrapper">
          <ReactLoading
            type={"bars"}
            color={"#3e3e3e"}
            height={"3rem"}
            width={"3rem"}
          />
        </div>
      </div>
    </>
  );
};

export default MainPostLoading;
