import React from "react";
import styled, { keyframes } from "styled-components";
export default function Button({ color }) {
  return <SpinnerS color={color}></SpinnerS>;
}
const Animation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;
const SpinnerS = styled.div`
  display: inline-block;
  width: 80px;
  height: 80px;
  z-index: 5000;

  &:after {
    content: " ";
    display: block;
    width: 3rem;
    height: 3rem;
    margin: auto;
    border-radius: 50%;
    border: 6px solid ${(props) => (props.color ? props.color : "#202124")};
    border-color: ${(props) => (props.color ? props.color : "#202124")}
      transparent ${(props) => (props.color ? props.color : "#202124")}
      transparent;
    animation: ${Animation} 1.2s linear infinite;
  }
`;
