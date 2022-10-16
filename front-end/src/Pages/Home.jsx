import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { Button, Modal, Container, Row, Col } from "react-bootstrap";

import ViewerPic from "../img/video/Viewer.mp4";
import viewPic from "../img/ViewerPic.png";
import StrategyPic from "../img/StrategyPic.png";

import { useAuthen } from "../services/Authen";

import { Header } from "../components/Header";
import BannerHead from "../components/BannerHead";
import BannerBottom from "../components/BannerBottom";

export const Home = () => {
  const isAuthen = useAuthen();
  let navigate = useNavigate();
  return (
    <div className="bg-secondary">
      <Header />
      <BannerHead />

      <Container>
        <div className="">
          <div className=" mt-4 ">
            <Row className="bg-dark rounded shadow ">
              <h3 className="text-light mt-2 ">Introduction</h3>
              <Col xs={6} className="mt-0 mb-4 ">
                <img
                  src={viewPic}
                  className=" rounded float-left w-100 h-100  bg-dark shadow  "
                  alt="ViewerPic"
                />
                {/* <video
                  muted=""
                  autoplay=""
                  loop=""
                  src={ViewerPic}
                  className="embed-responsive-item rounded float-left w-100 h-100  bg-dark shadow "
                  alt="ViewerPic"
                /> */}
              </Col>
              <Col xs={6} className="align-self-center  p-3 ">
                <p className="text-light text-center fs-5 mb-2">
                  สามารถดูTrading View การซื้อแบบ Real Time
                  และบอทสามารถควบคุมการซื้อได้ถึง 21 เหรียญ
                  <div>
                    <Button
                      type="button"
                      class="btn btn-outline-secondary mt-2"
                      onClick={() => navigate("/bot")}
                    >
                      See more...
                    </Button>
                  </div>
                </p>
              </Col>
            </Row>
            <Row className="bg-dark mt-3 rounded shadow">
              <h3 className="text-light mt-2 d-flex justify-content-end">
                Bot
              </h3>
              <Col xs={6} className="mt-5 align-self-center">
                <p className="text-light text-center fs-5 mb-1">
                  สามารถเลือกกลยุทธ์และรูปแบบเหรียญ
                  เพื่อให้บอททำการเทรดหรือแจ้งเตือน
                  <div>
                    <Button
                      type="button"
                      class="btn btn-outline-secondary mt-2"
                      onClick={() => navigate("/bot")}
                    >
                      See more...
                    </Button>
                  </div>
                </p>
              </Col>
              <Col xs={6} className="mt-0 mb-4">
                <img
                  src={StrategyPic}
                  className="f rounded float-left w-100 h-100  bg-dark shadow  "
                  alt="ViewerPic"
                />
              </Col>
            </Row>
            <Row className="bg-dark rounded shadow mt-3">
              <h3 className="text-light mt-2 ">back test</h3>
              <Col xs={6} className="mt-0 mb-4 ">
                <img
                  src={viewPic}
                  className=" rounded float-left w-100 h-100  bg-dark shadow  "
                  alt="ViewerPic"
                />
              </Col>
              <Col xs={6} className="align-self-center  p-3 ">
                <p className="text-light text-center fs-5 mb-2">
                  ....
                  <div>
                    <Button
                      type="button"
                      class="btn btn-outline-secondary mt-2"
                      onClick={() => navigate("/bot")}
                    >
                      See more...
                    </Button>
                  </div>
                </p>
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
