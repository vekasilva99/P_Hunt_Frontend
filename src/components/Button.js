import React from "react";
import styled from "styled-components";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosAdd } from "react-icons/io";
import { MdSave } from "react-icons/md";
export default function Button({
  color,
  color2,
  color3,
  image,
  children,
  ...rest
}) {
  return (
    <ButtonS color={color} color2={color2} color3={color3} {...rest}>
      {image ? <MdSave size="30px" /> : <IoIosArrowForward size="30px" />}
    </ButtonS>
  );
}
const ButtonS = styled.button`
  border: solid 2px ${(props) => (props.color3 ? props.color3 : "white")};
  color: ${(props) => (props.color3 ? props.color3 : "white")};
  padding: 0.9rem;
  font-size: 1em;
  margin: 0.3rem;
  margin-top: 0;
  width: 80px;
  height: 80px;
  display: ${(props) => (props.block ? "block" : "inline-block")};
  font-weight: 600;
  cursor: pointer;
  background: ${(props) => (props.color ? props.color : "transparent")};
  border-radius: 500px;
  transition: all ease-in-out 0.3s;

  &:hover {
    opacity: 0.8;
    background: white;
    color: ${(props) => (props.color2 ? props.color2 : "white")};
    border-color: white;
  }
  &:focus {
    opacity: 0.8;
    outline: none;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
  }

  @media only screen and (max-width: 734px) {
    width: 80px;
    height: 80px;
  }
`;
