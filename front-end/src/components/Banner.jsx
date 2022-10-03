import React, { useState } from "react";
import { Button, Modal, Nav } from "react-bootstrap";
import "../css/banner.css";

let BannerText = {
  title: "Crypto-Bot Trade",
  description:
    "เว็บบอทเทรดสสำหรับผู้ที่ไม่อยากเฝ้าหน้าจอตลอดเวลา ตามกลยุทธ์ CDC ActionZone, EMA10 21 และ EMA 10... เพื่อป้องกันการขาดทุนมากในตลาด.... ยังคิดบทไม่ออกมั่วๆอยู่",
};

function Banner() {
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
}

export default Banner;
