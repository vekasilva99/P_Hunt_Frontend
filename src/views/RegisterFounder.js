import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import RegisterFounder from "../components/RegisterFounder";
import Navbar from "../components/NavBar";
import Sidebar from "../components/Sidebar";

export default function RegisterV() {
  const [sidebar, setSidebar] = React.useState(false);

  const close = (e) => setSidebar(false);
  const open = (e) => {
    setSidebar(true);
    console.log(sidebar);
  };

  return (
    <HomeStyle>
      <Navbar handleSidebar={open} color="white" />
      <Sidebar handleSidebar={close} sidebar={sidebar} color="#F26924" />
      <RegisterFounder color="#F26924" />
    </HomeStyle>
  );
}

const HomeStyle = styled.section`
  max-height: 100vh;
  background: white;
  width: 100%;
`;
