import moment from "moment";
import React from "react";
import "./MainPostItemLoading.scss";

interface MainPostItemLoadingProps {}

const MainPostItemLoading = ({}: MainPostItemLoadingProps) => {
  return (
    <>
      <div className="Main-Post-Item-Loading">
        <div className="Main-Post-Item-Loading-Thumbnail">
          <span className="Main-Post-Item-Loading-Thumbnail-Image" />
        </div>
        <div className="Main-Post-Item-Loading-Content">
          <div className="Main-Post-Item-Loading-Content-Category">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="Main-Post-Item-Loading-Content-Title">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="Main-Post-Item-Loading-Content-Description">
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className="Main-Post-Item-Loading-Bottom">
          <div className="Main-Post-Item-Loading-Bottom-Profile">
            <span className="Main-Post-Item-Loading-Bottom-Profile-Avatar" />
            <div className="Main-Post-Item-Loading-Bottom-Profile-Name">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPostItemLoading;
