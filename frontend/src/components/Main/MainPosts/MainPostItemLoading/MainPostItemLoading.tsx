import moment from "moment";
import React from "react";
import "./MainPostItemLoading.scss";

interface MainPostItemLoadingProps {}

const MainPostItemLoading = ({}: MainPostItemLoadingProps) => {
  return (
    <>
      <div className="Main-Post-Item-Loading">
        <div className="Main-Post-Item-Loading-Thumbnail">
          <div className="Main-Post-Item-Loading-Thumbnail-Image" />
        </div>
        <div className="Main-Post-Item-Loading-Content">
          <div className="Main-Post-Item-Loading-Content-Category" />
          <div className="Main-Post-Item-Loading-Content-Title" />
          <div className="Main-Post-Item-Loading-Content-Description" />
        </div>
        <div className="Main-Post-Item-Loading-Bottom">
          <div className="Main-Post-Item-Loading-Bottom-Profile">
            <div className="Main-Post-Item-Loading-Bottom-Profile-Avatar" />
            <div className="Main-Post-Item-Loading-Bottom-Profile-Name" />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPostItemLoading;
