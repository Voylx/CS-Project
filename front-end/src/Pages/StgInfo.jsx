import React, { useEffect } from "react";
import { Header } from "../components/Header";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Container, Row, Col, Carousel } from "react-bootstrap";

import picEma1021 from "../img/picEma10-21.png";
import picCDC from "../img/picCDC.png";

const StgInfo = () => {
  let navigate = useNavigate();

  useEffect(() => {
    document.title = "Crypto-Bot : Strategy Information";
  }, []);

  return (
    <div className="bg-light bg-opacity-25">
      <Header />
      <Container>
        <div
          className="border p-3 mx-auto mt-4 mb-3 col-lg-10 col-md-9 col-sm-9 shadow-lg"
          style={{ borderRadius: "8px" }}
        >
          <h4 className="text-dark mt-2 mb-2 text-sm-center ">
            การเทรดกลยุทธ์ EMA10 และ EMA21
          </h4>

          <div className="d-flex justify-content-center  mb-3">
            <img
              src={picEma1021}
              className="  rounded float-left w-50 h-50 shadow"
              alt="picEma1021"
            />
          </div>
          <div className="fs-6">
            <p className="">
              การเทรด EMA10 และ EMA21 ด้วย TF1H / TF4H/ TF1D
              กลยุทธ์การเทรดนี้ถือว่าเป็นกลยุทธ์ขั้นพื้นฐานในการทำกำไร
              จากการใช้สัญญาณ การเข้า-ออก การเทรด ผ่านจุดตัดที่เรียกว่าเส้น
              EMA10 และ EMA21 ตามหลักการนี้จุดตัดที่เกิดขึ้น
              จะถือเป็นสัญญาณว่าได้เกิดการเปลี่ยนแปลงของ Trend ราคา ทั้งขึ้น
              หรือ ลง เมื่อเส้น EMA10 ตัดเส้น EMA21 ขึ้น จะทำการซื้อในแท่งถัดไป
              และ เมื่อ เส้นEMA10 ตัดเส้น EMA21 ลงจะทำการขายในแท่งถัดไป
            </p>
          </div>
        </div>
        <div
          className="border p-3 mx-auto mt-4 mb-3 col-lg-10 col-md-9 col-sm-9 shadow-lg"
          style={{ borderRadius: "8px" }}
        >
          <p className="fw-bold">
            EMA ย่อมาจาก Exponential Moving Average (EMA)
          </p>
          <p className="">
            คือ
            ค่าเฉลี่ยเคลื่อนที่ที่วิเคราะห์การเปลี่ยนแปลงของราคาปัจจุบันและระบุการเคลื่อนไหวของราคาล่าสุดซึ่งค่าเฉลี่ยก็คือราคาที่ผ่านมาแล้วเอามาเฉลี่ยกัน
          </p>
        </div>
        <div
          className="border p-3 mx-auto mt-4 mb-3 col-lg-10 col-md-9 col-sm-9 shadow-lg"
          style={{ borderRadius: "8px" }}
        >
          <h4 className="text-dark mt-2 mb-2 text-sm-center ">
            การเทรดกลยุทธ์ CDC
          </h4>

          <div className="d-flex justify-content-center  mb-3">
            <img
              src={picCDC}
              className="  rounded float-left w-50 h-50 shadow"
              alt="picEma1021"
            />
          </div>
          <div className="fs-6">
            <div className="">
              วิธีคิดหลักๆ จะใช้ เส้น EMA12 และ EMA26 ใช้พื้นที่ระหว่างเส้น EMA
              เป็น Action Zoneโดยเริ่มมีสัญญาณ ณ จุดตัดของเส้น EMA
              และเพื่อเป็นการยืนยันสัญญาณ ซื้อ-ขาย
              การเข้าเทรดจะทำงานในแท่งเทียนถัดไป หลังจากที่มีจุดยืนยันแล้ว
              เมื่อเส้น EMA12 สามารถตัดขึ้นเหนือเส้น EMA26 ได้ จะเกิดสัญลักษณ์
              จุดสีเขียวเป็นสัญญาญซื้อ และเมื่อเส้น EMA12 ตัดลงต่ำกว่าเส้น EMA26
              จะเกิดสัญลักษณ์ จุดแดงเป็นสัญญาณขาย
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default StgInfo;
