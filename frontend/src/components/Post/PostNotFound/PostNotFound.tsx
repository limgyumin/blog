import React from "react";
import "./PostNotFound.scss";
import { ReactComponent as Sign } from "../../../assets/images/not_found.svg";

interface PostNotFoundProps {}

const PostNotFound = ({}: PostNotFoundProps) => {
  return (
    <>
      <div className="Post-Paper-NotFound">
        <Sign className="Post-Paper-NotFound-Sign" />
        <div className="Post-Paper-NotFound-Container">
          <div className="Post-Paper-NotFound-Container-Image"></div>
          <p className="Post-Paper-NotFound-Container-Title">
            잠깐, 정말 이 주소가 맞나요?
          </p>
          <p className="Post-Paper-NotFound-Container-Subtitle">
            아닌 것 같은데용.. 😅
          </p>
        </div>
      </div>
    </>
  );
};

export default PostNotFound;
