import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { Button, Modal, Container, Row, Col } from "react-bootstrap";

import { useAuthen } from "../services/Authen";

import { Header } from "../components/Header";
import Banner from "../components/Banner";

export const Home = () => {
  const isAuthen = useAuthen();

  return (
    <div className="">
      <Header />
      <Banner />

      <Container className="">
        <div>
          <div className=" mt-4">
            <Row>
              <Col>
                <img
                  src="https://wallpaperaccess.com/full/732233.jpg"
                  class="rounded float-left w-50 "
                  alt="picture investigation2"
                />
                <Row>
                  <p className="text-center">ยังไม่รู้จะเอารูปไรใส่</p>
                </Row>
              </Col>

              <p className="text-center">ยังไม่รู้จะเอารูปไรใส่2</p>
              <img
                src="https://wallpaperaccess.com/full/732233.jpg"
                class="mt-4 rounded float-end w-50 "
                alt="picture investigation3"
              />
            </Row>
          </div>
        </div>
      </Container>
      {isAuthen && <>Login</>}
    </div>
  );
};
