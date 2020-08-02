import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import Gallery from "../components/Gallery";

export default function Product(props) {
  return (
    <StyledCard>
      <div className="container">
        <div className="close">
          <label
            className="close-b"
            type="button"
            onClick={() => {
              props.close(null);
            }}
          >
            <IoMdClose size="50px" />
          </label>
        </div>
        <div className="content">
          <div className="info">
            <div className="logo">
              <img className="photo-img" src={props.product.logo} />
            </div>
            <div className="info-in">
              <h1>{props.product.name}</h1>
              <h4>
                By: {props.product.user.name} {props.product.user.lastName}
              </h4>
              <h5>{props.product.description}</h5>
            </div>
          </div>
          <div className="gallery">
            <Gallery images={props.product.images} />
          </div>
        </div>
      </div>
    </StyledCard>
  );
}

const StyledCard = styled.div`
  z-index: 18000;

  overflow: hidden;
  .container {
    width: 100vw;
    height: 100%;
    overflow: hidden;

    top: 0;
    left: 0;
    margin: 0;
    background: transparent;
    z-index: 18000;
    position: absolute;

    .content {
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-rows: 40% 60%;
      grid-auto-columns: auto;

      .info {
        display: grid;
        grid-template-columns: 30% 70%;
        grid-auto-rows: auto;

        .info-in {
          background:white;
          h1 {
            font-size: 70px;
            margin: 0;
            color: black;
          }
          h4 {
            width: 100%;
            haight: 100%;
            overflow: overlay;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
              sans-serif;
            font-weight: 200;
            margin: 0;
            color: black;
          }
          h5 {
            width: 100%;
            haight: 100%;
            overflow: overlay;
            font-weight: 200;
            margin: 0;
            margin-top: 10px;
            color: black;
            font-size: 20px;
          }
        }

        .logo {
          display: flex;
          background:white;
          justify-content: center;
          align-items: flex-start;
          .photo-img {
            width: 250px !important;
            height: 250px !important;
            border-radius: 500px;
            border: solid 0.2em #F26924;
          }
        }
      }
    }
    .close {
      width: 100vw;
      height: 72px;
      padding: 29px 30px;

      .close-b {
        display: flex;
        position: absolute;
        right: 50px;
        cursor: pointer;
      }
    }
  }
  .gallery{
    display:flex;
    align-items:center;
    justify-content:center;
  }

  @media only screen and (max-width: 1000px) {
    .gallery{
      display:flex;
      align-items:center;
      justify-content:center;
    }
    .container{
      
    .content {
      width: 100vw;
      height: 100%;
      display: flex;
      flex-direction: column;


      .info {
        display: flex;
        width: 100vw;
        height: 50%;

        flex-direction: column;

        .info-in {
          display: flex;

          justify-content:center;
          align-items:center;
          text-align:center;
          flex-direction:column;
          h1 {
            font-size: 60px;
            margin: 0;
            color: black;
          }
          h4 {
            width: 100%;
            haight: 100%;
            overflow: overlay;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
              sans-serif;
            font-weight: 200;
            margin: 0;
            color: black;
          }
          h5 {
            width: 100%;
            haight: 100%;
            overflow: overlay;
            font-weight: 200;
            margin: 0;
            margin-top: 10px;
            color: black;
            font-size: 20px;
          }
      
         
        }

        .logo {
          display: flex;
          width: 100vw;
          height: 50%;
          justify-content: center;
          align-items: center;

          .photo-img {
            width: 150px !important;
            height: 150px !important;
            border-radius: 500px;
            border: solid 0.2em #F26924;
          }
          
      }
    }
    
  }}
`;
