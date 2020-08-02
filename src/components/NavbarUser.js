import React from "react";
import styled from "styled-components";
import { FiLogOut } from "react-icons/fi";
import { FiMenu } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";

export default function Navbar(props) {
  const [log, setLog] = React.useState(false);
  const dispatch = useDispatch();
  const logOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    dispatch({
      type: "LOGOUT",
    });
    setLog(true);
  };
  let style;
  if (props.popUp) {
    style = "close";
  } else {
    style = "fondo";
  }

  return (
    <>
      {log ? (
        <Redirect to="/" />
      ) : (
        <StyledNavbarIn>
          <div className={style}>
            <h2>PRODUCT HUNT</h2>
            <div className="menu" onClick={props.handleSidebar}>
              <FiMenu
                onClick={props.handleSidebar}
                size="30px"
                color={props.color ? props.color : "black"}
              />
            </div>
            <div className="log-out" onClick={logOut}>
              <FiLogOut
                onClick={logOut}
                size="30px"
                color={props.color ? props.color : "black"}
              />
            </div>
          </div>
        </StyledNavbarIn>
      )}
    </>
  );
}
const StyledNavbarIn = styled.nav`
  @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400;1,640;1,900&display=swap");
  .close {
    display: none;
  }
  .fondo {
    height: 72px;
    padding: 29px 30px;
    display: flex;
    position: fixed;
    flex-flow: row nowrap;
    align-items: center;
    font-family: Roboto;
    width: 100vw;
    top: 0;
    left: 0;
    background: transparent;
    z-index: 3500;

    h2 {
      font-family: "Playfair Display", serif;
      font-weight: 700;
      font-size: 20px;
      color: black;
      display: flex;
      align-items: center;
      justify-self: flex-start;
    }
    .menu {
      display: flex;
      position: fixed;
      right: 50px;
      z-index: 3501;
    }
    .log-out {
      display: flex;
      position: fixed;
      right: 100px;
      z-index: 3501;
    }
  }
`;
