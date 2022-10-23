import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { Button, Modal, Container, Row, Col, Carousel } from "react-bootstrap";

import ViewerGif from "../img/video/tradingView.gif";
import realTime from "../img/video/realtime.gif";

import botStrategy from "../img/video/botstrategy.gif";
import BackTestPic from "../img/BackTest.png";

import { useAuthen } from "../services/Authen";
import Axios from "../services/Axios";

import { Header } from "../components/Header";
import BannerHead from "../components/BannerHead";
import BannerBottom from "../components/BannerBottom";

export const Home = () => {
  const isAuthen = useAuthen();
  let navigate = useNavigate();
  return (
    <div className="bg-light bg-opacity-25">
      <Header />
      <BannerHead />

      <Container>
        <div className="mb-3">
          {/* ส่วนที่1 */}
          <div className=" mt-4 ">
            <Row className="bg-lightgray2 bg-opacity-75 rounded shadow  ">
              <h3 className="text-dark mt-2 text-center  text-sm-start">
                Introduction
              </h3>
              <Col xs={12} md={6}>
                <Carousel interval="dark" className="mt-0 mb-3 ">
                  <Carousel.Item interval={9000}>
                    <img
                      src={ViewerGif}
                      className=" rounded float-left w-100 h-100 shadow ratio ratio-16x9"
                      alt="ViewerRealPic"
                    />
                  </Carousel.Item>
                  <Carousel.Item interval={9000}>
                    <img
                      src={realTime}
                      className=" rounded float-left w-100 h-100  bg-dark shadow ratio ratio-16x9"
                      alt="TradingViewerPic"
                    />
                  </Carousel.Item>
                </Carousel>
              </Col>
              <Col xs={12} md={6} className="align-self-center  p-3 ">
                <div className="text-dark text-center fs-5 mb-2 mt-0">
                  สามารถดู Trading View การซื้อแบบ Real Time
                  และบอทสามารถควบคุมการซื้อ-ขาย ได้ถึง 21 เหรียญ
                  <div>
                    <Button
                      variant="outline-secondary"
                      className=" mt-2  text-dark"
                      onClick={() => (location = "/bot")}
                    >
                      See more...
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
            {/* ส่วนที่2 */}
            <Row className="bg-dark bg-opacity-75 mt-3 rounded shadow ">
              <h3 className=" text-light mt-2 d-flex  justify-content-center justify-content-md-end">
                Bot Strategy & Bot Notification
              </h3>
              <Col xs={12} md={6} className="fs-5 mt-0 align-self-center ">
                <div className="text-light text-center  mb-1 ">
                  สามารถเลือกกลยุทธ์และรูปแบบเหรียญ
                  เพื่อให้บอททำการซื้อขายอัตโนมัติ หรือให้บอทแจ้งเตือนผ่าน Line
                  ได้
                  <div>
                    <Button
                      variant="outline-secondary"
                      className="  mt-2 mb-2 text-light"
                      onClick={() => (location = "/bot")}
                    >
                      See more...
                    </Button>
                  </div>
                </div>
              </Col>
              <Col xs={12} md={6} className="mt-0 mb-4 ">
                <img
                  src={botStrategy}
                  className=" rounded float-left  bg-dark shadow  ratio ratio-16x9"
                  alt="botStrategy"
                />
              </Col>
            </Row>
            {/* ส่วนที่3 */}
            <Row className="bg-lightgray2  bg-opacity-75 rounded shadow mt-3 ">
              <h3 className="text-dark mt-2  text-center  text-sm-start">
                Back test
              </h3>
              <Col xs={12} md={6} className="mt-0 mb-3 ">
                <img
                  src={BackTestPic}
                  className=" rounded float-left w-100 h-100 shadow  "
                  alt="ViewerPic"
                />
              </Col>
              <Col xs={12} md={6} className="align-self-center   ">
                <div className="text-dark text-center fs-5 mb-2">
                  มี Back Test ที่สามารถดูย้อนหลังได้ในได้ละกลยุทธ์
                  และแต่ละเหรียญ
                  <div>
                    <Button
                      variant="outline-secondary "
                      className=" mt-2 text-dark"
                      onClick={() => (location = "/bot")}
                    >
                      See more...
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </Container>

      <BannerBottom />
    </div>
  );
};
