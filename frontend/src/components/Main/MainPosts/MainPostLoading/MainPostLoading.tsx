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
            className="Main-Post-Loading-Wrapper-Loading"
            type={"bars"}
            height={"3rem"}
            width={"3rem"}
          />
        </div>
      </div>
    </>
  );
};

export default MainPostLoading;
