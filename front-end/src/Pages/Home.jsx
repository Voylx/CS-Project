import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { Button, Modal, Container, Row, Col, Carousel } from "react-bootstrap";

import ViewerGif from "../img/video/tradingView.gif";
import realTime from "../img/video/realtime.gif";

import StrategyPic from "../img/StrategyPic.png";

import { useAuthen } from "../services/Authen";

import { Header } from "../components/Header";
import BannerHead from "../components/BannerHead";
import BannerBottom from "../components/BannerBottom";

export const Home = () => {
  const isAuthen = useAuthen();
  let navigate = useNavigate();
  return (
    <div className="bg-middlegray2 bg-opacity-25">
      <Header />
      <BannerHead />

      <Container>
        <div className="">
          <div className=" mt-4 ">
            <Row className="bg-lightgray2 bg-opacity-75 rounded shadow  ">
              <h3 className="text-dark mt-2 ">Introduction</h3>

              <Col xs={6}>
                <Carousel interval="dark" className="mt-0 mb-4 ">
                  <Carousel.Item interval={9000}>
                    <img
                      src={ViewerGif}
                      className=" rounded float-left w-100 h-100  shadow  "
                      alt="ViewerRealPic"
                    />
                  </Carousel.Item>
                  <Carousel.Item interval={9000}>
                    <img
                      src={realTime}
                      className=" rounded float-left w-100 h-100  bg-dark shadow  "
                      alt="TradingViewerPic"
                    />
                  </Carousel.Item>
                </Carousel>
              </Col>

              <Col xs={6} className="align-self-center  p-3 ">
                <div className="text-dark text-center fs-5 mb-2">
                  สามารถดู Trading View การซื้อแบบ Real Time
                  และบอทสามารถควบคุมการซื้อได้ถึง 21 เหรียญ
                  <div>
                    <Button
                      variant="outline-secondary"
                      className=" mt-2 text-dark"
                      onClick={() => navigate("/bot")}
                    >
                      See more...
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="bg-dark bg-opacity-75 mt-3 rounded shadow">
              <h3 className="text-light mt-2 d-flex justify-content-end">
                Bot Strategy & Bot Notification
              </h3>
              <Col xs={6} className="mt-5 align-self-center">
                <div className="text-light text-center fs-5 mb-1">
                  สามารถเลือกกลยุทธ์และรูปแบบเหรียญ
                  เพื่อให้บอททำการเทรดหรือแจ้งเตือน
                  <div>
                    <Button
                      variant="outline-secondary"
                      className="  mt-2 text-light"
                      onClick={() => navigate("/bot")}
                    >
                      See more...
                    </Button>
                  </div>
                </div>
              </Col>
              <Col xs={6} className="mt-0 mb-4">
                <img
                  src={StrategyPic}
                  className="f rounded float-left w-100 h-100  bg-dark shadow  "
                  alt="ViewerPic"
                />
              </Col>
            </Row>
            <Row className="bg-lightgray2  bg-opacity-75 rounded shadow mt-3">
              <h3 className="text-dark mt-2 ">back test</h3>
              <Col xs={6} className="mt-0 mb-4 ">
                <img
                  src={StrategyPic}
                  className=" rounded float-left w-100 h-100 shadow  "
                  alt="ViewerPic"
                />
              </Col>
              <Col xs={6} className="align-self-center  p-3 ">
                <div className="text-dark text-center fs-5 mb-2">
                  ....
                  <div>
                    <Button
                      variant="outline-secondary "
                      className=" mt-2 text-dark"
                      onClick={() => navigate("/bot")}
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

      {isAuthen && <>Login</>}
      <BannerBottom />
    </div>
  );
};
