import React from "react";
import "./MainPostNotFound.scss";
import { ReactComponent as Paper } from "../../../../assets/images/paper.svg";
import { ReactComponent as Shadow } from "../../../../assets/images/shadow.svg";

interface MainPostNotFoundProps {}

const MainPostNotFound = ({}: MainPostNotFoundProps) => {
  return (
    <>
      <div className="Main-Paper-NotFound">
        <Paper className="Main-Paper-NotFound-Paper" />
        <div className="Main-Paper-NotFound-Container">
          <div className="Main-Paper-NotFound-Container-Image">
            <Shadow className="Main-Paper-NotFound-Container-Image-Shadow" />
          </div>
          <p className="Main-Paper-NotFound-Container-Title">
            이런! 아무것도 없네요
          </p>
          <p className="Main-Paper-NotFound-Container-Subtitle">
            아마 곧 생기지 않을까요?.. 🤔
          </p>
        </div>
      </div>
    </>
  );
};

export default MainPostNotFound;
