import React from "react";
import "../css/bannerBottom.css";

let BannerText = {
  title: "Crypto-Bot Trade",
  description: "by Channatt & Naruebet",
};
const BannerBottom = () => {
  return (
    <div className="bannerBottom-bg">
      <div className="containerBottom">
        <div className="bannerBottom-con d-flex flex-column flex-md-row">
          <div className="bannerBottom-textHeader">
            <p>{BannerText.title}</p>
          </div>
          <div className="bannerBottom-text">
            <p>{BannerText.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerBottom;
