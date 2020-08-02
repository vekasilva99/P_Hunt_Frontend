import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Ribbon from "../components/Ribbon";
import ProductCard from "../components/ProductCard";
import NavbarUser from "../components/NavbarUser";
import Sidebar from "../components/SidebarVoter";
import Product from "../components/Product";
import { Link, animateScroll as scroll } from "react-scroll";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { PRODUCTS_ORDERED } from "../helpers/graphql/queries";
import { useQuery } from "@apollo/react-hooks";
import Spinner from "../components/Spinner";
import moment from "moment";

export default function HomeVoter() {
  const [sidebar, setSidebar] = React.useState(false);
  const [popUp, setPop] = React.useState(null);
  const [color, setColor] = React.useState("#C6E1E7");
  const [lastDate, setLastDate] = React.useState(null);
  const [productos, setProductos] = React.useState([]);
  const { data: dataU, error: errorU, loading: loadingU } = useQuery(
    PRODUCTS_ORDERED
  );

  if (loadingU)
    return (
      <StyledSpinner>
        <div className="spinner">
          <Spinner />
        </div>
      </StyledSpinner>
    );
  if (errorU) return `Error! ${errorU.message}`;

  const close = (e) => setSidebar(false);
  const open = (e) => {
    setSidebar(true);
    console.log(sidebar);
  };
  const handlePopUp = (prod) => {
    setPop(prod);
  };
  const getDates = (products) => {
    let dates = [];
    let date;

    for (let item of products) {
      if (
        dates.indexOf(
          moment(item.createdAt.toString()).format("MM-DD-YYYY").toString()
        ) === -1
      ) {
        dates.push(
          moment(item.createdAt.toString()).format("MM-DD-YYYY").toString()
        );
      }
    }
    console.log(dates);
    return dates;
  };

  const getProducts = (date, products) => {
    let productos = [];

    for (let item of products) {
      if (
        moment(item.createdAt.toString()).format("MM-DD-YYYY").toString() ===
        date
      ) {
        productos.push(item);
      }
    }
    console.log(productos);
    productos.sort((a, b) => (a.votes > b.votes ? -1 : 1));
    return productos;
  };
  const getDate = (date) => {
    let arreglo = date.split(" ");
    let final;

    if (arreglo[0] === "Last") {
      final = arreglo[0] + " " + arreglo[1];
    } else {
      final = arreglo[0];
    }

    return final;
  };
  return (
    <HomeStyle>
      <NavbarUser handleSidebar={open} popUp={popUp} />
      <Sidebar handleSidebar={close} sidebar={sidebar} color="#D9204E" />
      {popUp ? <Product product={popUp} close={handlePopUp} /> : null}
      <div className={popUp ? "voter-hide" : "voter"}>
        {dataU ? (
          <>
            {getDates(dataU.productsOrdered).map((date) => (
              <div className="list">
                <h1>{getDate(moment(date).calendar().toString())}</h1>
                <ProductCard
                  productos={getProducts(date, dataU.productsOrdered)}
                  popUp={handlePopUp}
                />
              </div>
            ))}{" "}
          </>
        ) : null}
      </div>
      <div className="fondo">
        <Ribbon color1="#D9204E" color2="#FF3366" />
      </div>
    </HomeStyle>
  );
}
const StyledSpinner = styled.div`
height: 100vh;
width: 100vw;
overflow-x: hidden;
overflow-y: scroll;
display: flex;
position:relative;
.spinner{
    display:flex;
    position:absolute:
    z-index:100;
    width:100%;
    height:100%;
    justify-content:center;
    align-items:center;

  }
`;
const HomeStyle = styled.section`
  height: auto;
  width: 100vw;
  overflow: hidden;
  .fondo {
    width: 90%;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
  }

  @import url("https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap");

  .voter {
    display: flex;
    flex-direction: column;
    width: 100vw;
    margin-top: 100px !important;
    height: auto;
    position: absolute;
    justify-content: center;
    align-items: center;
    background: transparent;
    z-index: 500;
    padding: 0;
  }
  .voter-hide {
    display: none;
  }

  .list {
    width: 700px;
    height: auto;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 8px;
    margin-top: 10px;
  }
  @media only screen and (max-width: 1000px) {
    .voter {
      width: 100vw;
      .list {
        width: 80%;
      }
    }
  }
`;
