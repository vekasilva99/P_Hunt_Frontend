import React from "react";
import styled, { keyframes } from "styled-components";

export default function Ribbon({ color1, color2 }) {
  return (
    <RibbonS color1={color1} color2={color2}>
      <div className="container">
        <div className="line-5"></div>
        <div className="line-3"></div>
        <div className="line-1"></div>
        <div className="line-2"></div>
        <div className="line-4"></div>
        <div className="line-6"></div>
        <div className="line-7"></div>
        <div className="line-8"></div>
        <div className="line-9"></div>
        <div className="line-10"></div>
        <div className="line-11"></div>
        <div className="line-12"></div>
        <div className="line-13"></div>
        <div className="line-14"></div>
        <div className="line-15"></div>
      </div>
    </RibbonS>
  );
}
const AnimationLine1 = keyframes`
  0% {
    transform: skewY(11deg);
  }
  50%{
    transform: skewY(13deg)
  }
  100% {
    transform: skewY(11deg);
  }
`;
const AnimationLine2 = keyframes`
  0% {
    transform: skewY(-20deg);
  }
  50%{
    transform: skewY(-18deg)
  }
  100% {
    transform: skewY(-20deg);
  }
`;
const AnimationLine3 = keyframes`
  0% {
    transform: skewY(-20deg);
  }
  50%{
    transform: skewY(-18deg)
  }
  100% {
    transform: skewY(-20deg);
  }
`;
const AnimationLine4 = keyframes`
  0% {
    transform: skewY(11deg);
  }
  50%{
    transform: skewY(13deg)
  }
  100% {
    transform: skewY(11deg);
  }
`;
const Animation = keyframes`
  0% {
    transform: translateY(0);
    transition: transform 5s ease-in;
  }
  50%{
    transform: translateY(-15vh);
    transition: transform 5s ease-in;
  }
  100% {
    transform: translateY(0);
    transition: transform 5s ease-in;
  }
`;
const RibbonS = styled.div`
  height: 100vh;
  overflow: hidden;

  .container {
    margin: auto;
    display: grid;
    width: 900px;
    grid-auto-rows: 150px;
    font-size: 3em;
    animation: ${Animation} 90s linear infinite;
  }

  .line-1 {
    background-color: ${(props) => props.color1};
    line-height: 500px;
    text-align: center;
    margin-top: 110px;
    height: 100%;
    transform: skewY(11deg);
    animation: ${AnimationLine1} 10s linear infinite;
  }

  .line-2 {
    background-color: ${(props) => props.color2};
    transform: skewY(-20deg);
    margin-top: 215px;
    z-index: 1;
    height: 100%;
    animation: ${AnimationLine2} 10s linear infinite;
  }
  .line-3 {
    background-color: ${(props) => props.color2};
    transform: skewY(-20deg);
    margin-bottom: 110px;
    z-index: 1;
    height: 100%;
    animation: ${AnimationLine3} 10s linear infinite;
  }
  .line-4 {
    background-color: ${(props) => props.color1};
    line-height: 500px;
    text-align: center;
    margin-top: 320px;
    height: 100%;
    transform: skewY(11deg);
    animation: ${AnimationLine4} 10s linear infinite;
  }
  .line-5 {
    background-color: ${(props) => props.color1};
    line-height: 500px;
    text-align: center;
    margin-top: -110px;
    height: 100%;
    transform: skewY(11deg);
    animation: ${AnimationLine1} 10s linear infinite;
  }
  .line-6 {
    background-color: ${(props) => props.color2};
    transform: skewY(-20deg);
    margin-top: 500px;
    z-index: 1;
    height: 100%;
    animation: ${AnimationLine2} 10s linear infinite;
  }
  .line-7 {
    background-color: ${(props) => props.color1};
    line-height: 500px;
    text-align: center;
    margin-top: 600px;
    height: 100%;
    transform: skewY(11deg);
    animation: ${AnimationLine4} 10s linear infinite;
  }
  .line-8 {
    background-color: ${(props) => props.color2};
    transform: skewY(-20deg);
    margin-top: 700px;
    z-index: 1;
    height: 100%;
    animation: ${AnimationLine2} 10s linear infinite;
  }
  .line-9 {
    background-color: ${(props) => props.color1};
    line-height: 500px;
    text-align: center;
    margin-top: 800px;
    height: 100%;
    transform: skewY(11deg);
    animation: ${AnimationLine4} 10s linear infinite;
  }

  .line-10 {
    background-color: ${(props) => props.color2};
    transform: skewY(-20deg);
    margin-top: 900px;
    z-index: 1;
    height: 100%;
    animation: ${AnimationLine2} 10s linear infinite;
  }

  .line-11 {
    background-color: ${(props) => props.color1};
    line-height: 500px;
    text-align: center;
    margin-top: 1000px;
    height: 100%;
    transform: skewY(11deg);
    animation: ${AnimationLine4} 10s linear infinite;
  }

  .line-12 {
    background-color: ${(props) => props.color2};
    transform: skewY(-20deg);
    margin-top: 1100px;
    z-index: 1;
    height: 100%;
    animation: ${AnimationLine2} 10s linear infinite;
  }
  .line-13 {
    background-color: ${(props) => props.color1};
    line-height: 500px;
    text-align: center;
    margin-top: 1200px;
    height: 100%;
    transform: skewY(11deg);
    animation: ${AnimationLine4} 10s linear infinite;
  }

  .line-14 {
    background-color: ${(props) => props.color2};
    transform: skewY(-20deg);
    margin-top: 1300px;
    z-index: 1;
    height: 100%;
    animation: ${AnimationLine2} 10s linear infinite;
  }
  .line-15 {
    background-color: ${(props) => props.color1};
    line-height: 500px;
    text-align: center;
    margin-top: 1400px;
    height: 100%;
    transform: skewY(11deg);
    animation: ${AnimationLine4} 10s linear infinite;
  }

  @media only screen and (min-width: 2200px) {
    .container {
      margin: auto;
      display: grid;
      width: 1200px;
      grid-auto-rows: 250px;
      font-size: 3em;
      animation: ${Animation} 90s linear infinite;
    }
  }

  @media only screen and (min-width: 3000px) {
    .container {
      margin: auto;
      display: grid;
      width: 2000px;
      grid-auto-rows: 440px;
      font-size: 3em;
      animation: ${Animation} 90s linear infinite;
    }
  }

  @media only screen and (max-width: 800px) {
    width: 100%;
    .container {
      margin: auto;
      display: grid;
      width: 600px;
      grid-auto-rows: 150px;
      font-size: 3em;
      animation: ${Animation} 90s linear infinite;
    }
  }
`;
