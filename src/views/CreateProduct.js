import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Ribbon from "../components/Ribbon";
import NavbarUser from "../components/NavbarUser";
import CreateProduct from "../components/CreateProduct";
import Sidebar from "../components/SidebarFounder";
import { Link, animateScroll as scroll } from "react-scroll";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";

export default function HomeFounder() {
  const [sidebar, setSidebar] = React.useState(false);
  const [color, setColor] = React.useState("#C6E1E7");

  const close = (e) => setSidebar(false);
  const open = (e) => {
    setSidebar(true);
    console.log(sidebar);
  };

  return (
    <HomeStyle>
      <NavbarUser handleSidebar={open} />
      <Sidebar handleSidebar={close} sidebar={sidebar} color="#F26924" />
      <CreateProduct color="#ff874c" />
      <Ribbon color1="#F26924" color2="#FF874C" />
    </HomeStyle>
  );
}

const HomeStyle = styled.section`
  max-height: 100vh;
  background: white;
  width: 100%;
  @import url("https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap");

  .voter {
    height: 100vh;
    width: 100vw;
    h1 {
      display: flex;
      position: absolute;
      font-size: 200px;
      margin-left: 20%;
      z-index: 200;
    }
    .info {
      position: absolute;
      margin: 0;
      margin-top: 20%;
      margin-left: 35%;
      z-index: 200;
      h2 {
        font-family: "Playfair Display", serif;
        font-size: 30px;
        font-weight: 400;
      }
      h4 {
        font-family: "Playfair Display", serif;
        font-size: 12px;
        font-weight: 400;
      }
    }
  }
`;
