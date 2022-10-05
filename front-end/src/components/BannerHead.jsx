import React, { useState } from "react";
import "../css/bannerHead.css";

let BannerText = {
  title: "Crypto-Bot Trade",
  description:
    "เว็บบอทเทรดสำหรับผู้ที่ไม่อยากเฝ้าหน้าจอตลอดเวลา ตามกลยุทธ์ CDC ActionZone, EMA10 21... เพื่อป้องกันการขาดทุนมากในตลาด.... ยังคิดบทไม่ออกมั่วๆอยู่",
};

const BannerHead = () => {
  return (
    <div className="banner-bg">
      <div className="container">
        <div className="banner-con">
          <div className="banner-textHeader">
            <p>{BannerText.title}</p>
            <div className="banner-text">
              <p>{BannerText.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerHead;
