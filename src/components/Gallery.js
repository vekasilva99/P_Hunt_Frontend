import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import { FaQuoteLeft } from "react-icons/fa";

export default function Gallery(props) {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <StyledCard>
      <Slider {...settings}>
        {props.images.map((image) => (
          <div className="div">
            <img className="photo" src={image} />
          </div>
        ))}
      </Slider>
    </StyledCard>
  );
}

const StyledCard = styled.div`
  width: 90vw;
  height: 400px;
  align-items: center;
  align-self:center;
  justify-self:center;
  justify-content:center;
  background:white;


  .div {
    max-width: 200px;
    height: 200px;
    margin: 20px;
    align-items: center;
    justify-content:center;
    .photo {
      width: 200px !important;
      height: 200px !important;
      border-radius: 500px;
      border: solid 0.2em white;
     
    }
  }

  @media only screen and (max-width: 1000px) {
    width: 80vw;
    height: 200px;
    .div {
      align-items: center;
      justify-content:center;
      max-width: 80vw;
      height: 130px;
      margin: 0;
      .photo {
        width: 120px !important;
        height: 120px !important;
        border-radius: 500px;
        border: solid 0.2em white;
        margin:0 auto;
      }
  }
`;
