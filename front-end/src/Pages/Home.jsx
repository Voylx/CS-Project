import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";

import { useAuthen } from "../services/Authen";

import { Header } from "../components/Header";
import { Banner } from "../Pages/Banner.jsx";
export const Home = () => {
  const isAuthen = useAuthen();
  let bannerText = {
    title: "Crypto-Bot Trade",
    description: "บอทเทรดสำหรับคนที่ไม่ต้องการจ่องหน้าจอ ตามหลักกลยุทธ์ CDC และ EMA 10 21 บลาๆ เทสๆ",
    img: "https://images.unsplash.com/photo-1606189934846-a527add8a77b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
  }

  return (
    <div>
      <Header />
      <Container className="">
        {isAuthen && <>Login</>}
        <Banner />






      </Container>
    </div>
  );
};
