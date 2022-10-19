import React, { useState } from "react";
import "../css/bannerHead.css";

import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
let BannerText = {
  title: "Crypto-Bot Trade",
  description:
    "เว็บบอทเทรดสำหรับผู้ที่ไม่อยากเฝ้าหน้าจอตลอดเวลา ตามกลยุทธ์ CDC ActionZone, EMA10 21... เพื่อป้องกันการขาดทุนมากในตลาด",
};

const BannerHead = () => {
  let navigate = useNavigate();
  return (
    <div className="banner-bg">
      <div className="container">
        <div className="banner-con">
          <div className="banner-textHeader">
            <p>{BannerText.title}</p>

            <div className="banner-text">
              <p>{BannerText.description}</p>
              <Button
                type="button"
                className="btn btn-primary mt-1"
                onClick={() => (location = "/bot")}
              >
                เริ่มต้นใช้งาน
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerHead;
