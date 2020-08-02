import React from "react";
import styled from "styled-components";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosAdd } from "react-icons/io";
import { MdSave } from "react-icons/md";
import { NavLink, withRouter } from "react-router-dom";
export default function Button({
  color,
  color2,
  color3,
  image,
  children,
  link,
  ...rest
}) {
  return (
    <ButtonS color={color} color2={color2} color3={color3} {...rest}>
      <NavLink to={link} className="nav">
        <IoIosArrowForward size="30px" />
      </NavLink>
    </ButtonS>
  );
}
const ButtonS = styled.button`
  border: solid 4px ${(props) => (props.color ? props.color : "white")};
  color: ${(props) => (props.color3 ? props.color3 : "black")};
  padding: 0.9rem;
  font-size: 1em;
  margin: 0.3rem;
  margin-top: 0;
  width: 90px;
  height: 90px;
  display: ${(props) => (props.block ? "block" : "inline-block")};
  font-weight: 600;
  cursor: pointer;
  background: transparent;
  border-radius: 500px;
  transition: all ease-in-out 0.3s;
  z-index: 200;

  &:hover {
    opacity: 0.8;
    background: ${(props) => (props.color ? props.color : "white")};
    color: black;
    border-color: black;
  }
  &:focus {
    opacity: 0.8;
    outline: none;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
  }

  .nav {
    ouline: none;
    color: black;
  }
  @media only screen and (max-width: 734px) {
    width: 90px;
    height: 90px;
  }
`;
