import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { Button, Modal, Container, Row, Col } from "react-bootstrap";
import viewPic from "../img/ViewerPic.png";

import { useAuthen } from "../services/Authen";

import { Header } from "../components/Header";
import BannerHead from "../components/BannerHead";
import BannerBottom from "../components/BannerBottom";

export const Home = () => {
  const isAuthen = useAuthen();

  return (
    <div className="bg-secondary">
      <Header />
      <BannerHead />

      <Container>
        <div className="">
          <div className=" mt-4 ">
            <Row>
              <Col xs={6} className="mt-4 ">
                <img
                  src={viewPic}
                  className="rounded float-left w-100 bg-dark"
                  alt="viewPic"
                />
              </Col>
              <Col xs={6} className="mt-5 align-self-center">
                <p className="text-center ">มีให้เหรียญเทรดถึง 21 เหรียญ</p>
              </Col>
              <Col xs={6} className="mt-5 align-self-center">
                <p className="text-center">ยังไม่รู้จะเอารูปไรใส่2</p>
              </Col>
              <Col xs={6} className="mt-5">
                <img
                  src="https://wallpaperaccess.com/full/732233.jpg"
                  className="mt-4 rounded float-end w-100 "
                  alt="picture investigation3"
                />
              </Col>
              <Col xs={6} className="mt-5">
                <img
                  src="https://wallpaperaccess.com/full/732233.jpg"
                  className="rounded float-left w-100 "
                  alt="picture investigation2"
                />
              </Col>
              <Col xs={6} className="mt-5 align-self-center">
                <p className="text-center">ยังไม่รู้จะเอารูปไรใส่3</p>
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
