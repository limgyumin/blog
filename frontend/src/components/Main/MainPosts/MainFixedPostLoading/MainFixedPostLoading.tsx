import React from "react";
import "./MainFixedPostLoading.scss";

interface MainFixedPostLoadingProps {}

const MainFixedPostLoading = ({}: MainFixedPostLoadingProps) => {
  return (
    <>
      <div className="Main-Fixed-Post-Loading">
        <div className="Main-Fixed-Post-Loading-Thumbnail">
          <span className="Main-Fixed-Post-Loading-Thumbnail-Image" />
        </div>
        <div className="Main-Fixed-Post-Loading-Area">
          <div className="Main-Fixed-Post-Loading-Area-Content">
            <div className="Main-Fixed-Post-Loading-Area-Content-Category">
              <span />
              <span />
              <span />
            </div>
            <div className="Main-Fixed-Post-Loading-Area-Content-Title">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="Main-Fixed-Post-Loading-Area-Content-Description">
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
          <div className="Main-Fixed-Post-Loading-Area-Information">
            <div className="Main-Fixed-Post-Loading-Area-Information-Profile">
              <span className="Main-Fixed-Post-Loading-Area-Information-Profile-Avatar" />
              <div className="Main-Fixed-Post-Loading-Area-Information-Profile-Name">
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainFixedPostLoading;
