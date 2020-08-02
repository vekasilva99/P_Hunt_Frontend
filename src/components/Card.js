import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import { FaQuoteLeft } from "react-icons/fa";

export default function CardC(props) {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 3,
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
  width: 600px;
  height: 200px;
  align-items: center;
  align-self: center;
  justify-self: center;
  justify-content: center;

  .div {
    max-width: 50px;
    height: 80px;
    margin: 0px;
    align-items: center;
    justify-content: center;
    .photo {
      width: 80px !important;
      height: 80px !important;
      border-radius: 500px;
      border: solid 0.2em white;
    }
  }

  @media only screen and (max-width: 1000px) and (min-width: 481px) {
    width: 80vw;
    align-items: center;
    justify-content: center;
    height: 200px;
    .div {
      align-items: center;
      justify-content: center;
      max-width: 80vw;
      height: 130px;

      margin: 0;
      .photo {
        width: 120px !important;
        height: 120px !important;
        border-radius: 500px;
        border: solid 0.2em white;
        margin: 0 auto;
      }
    }
  }

  @media only screen and (max-width: 480px) {
    width: 80vw;
    align-items: center;
    justify-content: center;
    height: 200px;
    .div {
      align-items: center;
      justify-content: center;
      max-width: 80vw;
      height: 130px;
      margin: 0;
      .photo {
        width: 120px !important;
        height: 120px !important;
        border-radius: 500px;
        border: solid 0.2em white;
        margin: 0 auto;
      }
    }
  }
`;
