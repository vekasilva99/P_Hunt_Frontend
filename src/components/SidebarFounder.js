import React from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import { NavLink, withRouter } from "react-router-dom";

export default function Sidebar(props) {
  let style;
  if (props.sidebar) {
    style = "open";
  } else {
    style = "close";
  }
  return (
    <StyledSidebar color={props.color}>
      <div className={style}>
        <div className="clear"></div>
        <div className="side">
          <div className="close-X">
            <MdClose onClick={props.handleSidebar} size="50px" color="white" />
            <ul className="nav-links">
              <li>
                <NavLink to="/founder/myproducts" className="link1">
                  My Products
                </NavLink>
                <NavLink to="/founder/createproduct" className="link2">
                  Add a Product
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </StyledSidebar>
  );
}

const StyledSidebar = styled.nav`
  overflow: hidden;
  .open {
    position: fixed;
    z-index: 4000;
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-areas: "clear side";
    transform: translateY(0);
    transition: transform 0.4s ease-in;
  }
  .close {
    position: fixed;
    z-index: 2000;
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-areas: "clear side";
    transform: translateY(-100vh);
    transition: transform 0.4s ease-in;
  }
  .clear {
    background: white;
    width: 100%;
    height: 100%;
    grid-area: clear;
    opacity: 0.5;
  }

  .side {
    background: ${(props) => props.color};
    width: 100%;
    height: 100%;
    grid-area: side;
  }

  .close-X {
    position: fixed;
    z-index: 4100;
    right: 50px;
    top: 50px;
    color: white;
  }

  .nav-links {
    top: 100px;
    left: 50%;
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    list-style: none;
    justify-content: flex-start;
  }
  .link1 {
    display: flex;
    color: #fafafa;
    font-weight: 500;
    text-decoration: none;
    padding: 1.4rem;
    padding-left: 2rem;
    padding-right: 1.4rem;
    padding-bottom: 0;
    font-size: 50px;
    cursor: pointer;
    /* transition: all ease-in-out 0.3s; */
    justify-content: flex-start;
    &:hover {
      height: 35px;
      max-width: 300px;
      border-bottom: 30px solid rgba(255, 255, 255, 0.4);
    }
    &:focus {
      outline: none;
    }
  }
  .link2 {
    display: flex;
    color: #fafafa;
    font-weight: 500;
    margin-top: 50px;
    text-decoration: none;
    padding: 1.4rem;
    padding-left: 2rem;
    padding-right: 1.4rem;
    padding-bottom: 0;
    font-size: 50px;
    cursor: pointer;
    /* transition: all ease-in-out 0.3s; */
    justify-content: flex-start;
    &:hover {
      height: 35px;
      max-width: 370px;
      border-bottom: 30px solid rgba(255, 255, 255, 0.4);
    }
    &:focus {
      outline: none;
    }
  }
  .link3 {
    display: flex;
    color: #fafafa;
    font-weight: 500;
    text-decoration: none;
    padding: 1.4rem;
    margin-top: 50px;
    padding-left: 2rem;
    padding-right: 1.4rem;
    padding-bottom: 0;
    font-size: 50px;
    cursor: pointer;
    /* transition: all ease-in-out 0.3s; */
    justify-content: flex-start;
    &:hover {
      height: 35px;
      max-width: 450px;
      border-bottom: 30px solid rgba(255, 255, 255, 0.4);
    }
    &:focus {
      outline: none;
    }
  }
  @media only screen and (max-width: 1000px) {
    .open {
      position: fixed;
      z-index: 4000;
      width: 100vw;
      height: 100vh;
      display: grid;
      grid-template-areas: "clear side";
      transform: translateY(0);
      transition: transform 0.4s ease-in;
    }
    .close {
      position: fixed;
      z-index: 2000;
      width: 100vw;
      height: 100vh;
      display: grid;
      grid-template-areas: "clear side";
      transform: translateY(-100vh);
      transition: transform 0.4s ease-in;
    }
    .clear {
      background: white;
      width: 0%;
      height: 0%;
      grid-area: clear;
      opacity: 0.5;
    }

    .side {
      background: ${(props) => props.color};
      width: 100vw;
      height: 100vh;
      grid-area: side;
    }

    .close-X {
      position: fixed;
      z-index: 4100;
      right: 50px;
      top: 50px;
      color: white;
    }
    .nav-links {
      top: 100px;
      left: 0;
      position: fixed;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      list-style: none;
      justify-content: flex-start;
    }

    .link1 {
      display: flex;
      color: #fafafa;
      font-weight: 500;
      text-decoration: none;
      padding: 1.4rem;
      padding-left: 1rem;
      padding-right: 1.4rem;
      padding-bottom: 0;
      font-size: 40px;
      cursor: pointer;
      /* transition: all ease-in-out 0.3s; */
      justify-content: flex-start;
      &:hover {
        height: 35px;
        max-width: 150px;
        border-bottom: 30px solid rgba(255, 255, 255, 0.4);
      }
      &:focus {
        outline: none;
      }
    }
    .link2 {
      display: flex;
      color: #fafafa;
      font-weight: 500;
      margin-top: 40px;
      text-decoration: none;
      padding: 1.4rem;
      padding-left: 1rem;
      padding-right: 1.4rem;
      padding-bottom: 0;
      font-size: 40px;
      cursor: pointer;
      /* transition: all ease-in-out 0.3s; */
      justify-content: flex-start;
      &:hover {
        height: 35px;
        max-width: 370px;
        border-bottom: 30px solid rgba(255, 255, 255, 0.4);
      }
      &:focus {
        outline: none;
      }
    }
    .link3 {
      display: flex;
      color: #fafafa;
      font-weight: 500;
      text-decoration: none;
      padding: 1.4rem;
      margin-top: 40px;
      padding-left: 1rem;
      padding-right: 1.4rem;
      padding-bottom: 0;
      font-size: 40px;
      cursor: pointer;
      /* transition: all ease-in-out 0.3s; */
      justify-content: flex-start;
      &:hover {
        height: 35px;
        max-width: 450px;
        border-bottom: 30px solid rgba(255, 255, 255, 0.4);
      }
      &:focus {
        outline: none;
      }
    }
  }
`;
