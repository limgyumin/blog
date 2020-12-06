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
              <span style={{ width: "6rem" }} />
              <span style={{ width: "12rem" }} />
              <span style={{ width: "4rem" }} />
            </div>
            <div className="Main-Fixed-Post-Loading-Area-Content-Title">
              <span style={{ width: "9rem" }} />
              <span />
              <span style={{ width: "4rem" }} />
              <span style={{ width: "8rem" }} />
              <span style={{ width: "3rem" }} />
            </div>
            <div className="Main-Fixed-Post-Loading-Area-Content-Description">
              <span style={{ width: "3rem" }} />
              <span style={{ width: "4rem" }} />
              <span style={{ width: "6rem" }} />
              <span style={{ width: "2rem" }} />
              <span style={{ width: "7rem" }} />
              <span style={{ width: "5rem" }} />
              <span style={{ width: "6rem" }} />
              <span style={{ width: "5rem" }} />
              <span style={{ width: "6rem" }} />
              <span style={{ width: "2rem" }} />
              <span style={{ width: "9rem" }} />
              <span style={{ width: "4rem" }} />
              <span style={{ width: "2rem" }} />
              <span style={{ width: "6rem" }} />
              <span style={{ width: "8rem" }} />
              <span style={{ width: "4rem" }} />
              <span style={{ width: "2rem" }} />
              <span style={{ width: "4rem" }} />
              <span style={{ width: "4rem" }} />
            </div>
          </div>
          <div className="Main-Fixed-Post-Loading-Area-Information">
            <div className="Main-Fixed-Post-Loading-Area-Information-Profile">
              <span className="Main-Fixed-Post-Loading-Area-Information-Profile-Avatar" />
              <div className="Main-Fixed-Post-Loading-Area-Information-Profile-Name">
                <span style={{ width: "3rem" }} />
                <span style={{ width: "6rem" }} />
                <span style={{ width: "4rem" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainFixedPostLoading;
