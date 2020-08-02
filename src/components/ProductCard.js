import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { IoIosArrowUp } from "react-icons/io";
import { useMutation } from "@apollo/react-hooks";
import { ADD_VOTE } from "../helpers/graphql/mutations/index";
import Spinner from "../components/Spinner";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";

export default function CardC(props) {
  const [popUp, setPop] = React.useState(null);
  const [addVote, { data, loading, error }] = useMutation(ADD_VOTE);
  const dispatch = useDispatch();

  const { role, _id, name, products } = useSelector((state) => ({
    ...state.User,
  }));
  const getValue = (productss, producto) => {
    let value = false;
    let count = 0;

    if (productss) {
      for (let item of productss) {
        if (item._id === producto._id) {
          count = count + 1;
        }
      }
      if (count > 0) {
        value = true;
      }
    }
    console.log(producto.name, value);
    return value;
  };
  return (
    <>
      <StyledCard>
        {props.productos.map((product) => (
          <>
            <div className="item">
              <div className="photo">
                <img className="photo-img" src={product.logo} />
              </div>
              <div className="info-p">
                <label
                  type="button"
                  onClick={(e) => {
                    props.popUp(product);
                    console.log(product);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <h2>{product.name}</h2>
                </label>

                <h4>{product.description}</h4>
              </div>
              <div className="vote-b">
                <button
                  disabled={getValue(products, product)}
                  type="button"
                  onClick={async (e) => {
                    console.log(product._id);
                    const { data: dataV } = await addVote({
                      variables: { id: product._id },
                    });

                    if (dataV && dataV.addVote) {
                      dispatch({
                        type: "UPDATE_PRODUCT",
                        payload: {
                          _id: product._id,
                        },
                      });
                    }
                    window.location.reload(false);
                    window.location.reload(false);
                  }}
                  className={
                    getValue(products, product)
                      ? "button-vote-disabled"
                      : "button-vote"
                  }
                >
                  <h3>{product.votes.toString()}</h3>
                  <IoIosArrowUp size="20px" />
                </button>
              </div>
            </div>
          </>
        ))}
      </StyledCard>
    </>
  );
}
const StyledSpinner = styled.div`
height: 100vh;
width: 100vw;
overflow-x: hidden;
overflow-y: scroll;
background: blue;
display: flex;
position:relative;
.spinner{
    display:flex;
    position:absolute:
    z-index:100;
    width:100%;
    height:100%;
    justify-content:center;

  }
`;

const StyledCard = styled.div`
  width: 700px;

  .item {
    width: 100%;
    height: 150px;
    padding: 0;
    display: grid;
    grid-template-columns: 20% 60% 20%;
    grid-auto-rows: auto;
    margin-bottom: 5px;
    background: white;
    border: 3px solid #d9204e;
  }

  .photo {
    display: flex;
    justify-content: center;
    align-items: center;
    .photo-img {
      width: 120px !important;
      height: 120px !important;
      border-radius: 500px;
      border: solid 0.2em #d9204e;
    }
  }

  .info-p {
    h2 {
      font-size: 50px;
      margin: 0;
      color: black;
    }
    h4 {
      width: 100%;
      haight: 100%;
      overflow: overlay;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      font-weight: 200;
      margin: 0;
      color: black;
    }
  }
  .vote-b {
    display: flex;
    justify-content: center;
    align-items: center;
    .button-vote {
      border: solid 2px #d9204e;
      color: #f26924;
      z-index: 5000;
      padding: 0.9rem;
      font-size: 1em;
      margin: 0 auto;
      margin-top: 2px;
      width: 90px;
      height: 90px;
      display: flex;
      font-weight: 600;
      cursor: pointer;
      background: transparent;
      border-radius: 500px;
      transition: all ease-in-out 0.3s;
      justify-content: center;
      align-items: center;
      justify-self: center;
      align-self: center;
      flex-direction: column;
      color: black;
      h3 {
        margin: 0;
      }

      &:hover {
        opacity: 0.8;
        background: white;
        color: #d9204e;
        border-color: #d9204e;
      }
      &:focus {
        opacity: 0.8;
        outline: none;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
      }
    }
    .button-vote-disabled {
      border: solid 2px #d9204e;
      color: #f26924;
      z-index: 5000;
      padding: 0.9rem;
      font-size: 1em;
      margin: 0 auto;
      margin-top: 2px;
      width: 90px;
      height: 90px;
      display: flex;
      font-weight: 600;
      background: #d9204e;
      border-radius: 500px;
      transition: all ease-in-out 0.3s;
      justify-content: center;
      align-items: center;
      justify-self: center;
      align-self: center;
      flex-direction: column;
      color: black;
      h3 {
        margin: 0;
      }

      &:hover {
        background: #d9204e;
        color: black;
        border-color: #d9204e;
      }
      &:focus {
        outline: none;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
      }
    }
  }

  @media only screen and (min-width: 601px) and (max-width: 1000px) {
    width: 100%;
    .item {
      width: 100%;
      display: grid;
      grid-template-columns: 35% 35% 30%;
      grid-auto-rows: auto;

      .photo {
        display: flex;
        justify-content: center;
        align-items: center;
        .photo-img {
          margin-top: 2px;
          width: 110px !important;
          height: 110px !important;
          border-radius: 500px;
          border: solid 0.2em #d9204e;
        }
      }

      .info-p {
        h2 {
          font-size: 30px;
          margin: 0;
          color: black;
        }
        h4 {
          width: 100%;
          haight: 100%;
          overflow: overlay;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
          font-weight: 200;
          margin: 0;
          color: black;
        }
      }
      .vote-b {
        .button-vote {
          border: solid 2px #d9204e;
          color: #f26924;
          z-index: 5000;
          padding: 0.9rem;
          font-size: 1em;
          margin: 0 auto;
          margin-top: 2px;
          width: 90px;
          height: 90px;
          display: flex;
          font-weight: 600;
          cursor: pointer;
          background: transparent;
          border-radius: 500px;
          transition: all ease-in-out 0.3s;
          justify-content: center;
          align-items: center;
          justify-self: center;
          align-self: center;
          flex-direction: column;
          color: black;
          h3 {
            margin: 0;
          }

          &:hover {
            opacity: 0.8;
            background: white;
            color: #d9204e;
            border-color: #d9204e;
          }
          &:focus {
            opacity: 0.8;
            outline: none;
            box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
          }
        }
        .button-vote-disabled {
          border: solid 2px #d9204e;
          color: #f26924;
          z-index: 5000;
          padding: 0.9rem;
          font-size: 1em;
          margin: 0 auto;
          margin-top: 2px;
          width: 90px;
          height: 90px;
          display: flex;
          font-weight: 600;
          background: #d9204e;
          border-radius: 500px;
          transition: all ease-in-out 0.3s;
          justify-content: center;
          align-items: center;
          justify-self: center;
          align-self: center;
          flex-direction: column;
          color: black;
          h3 {
            margin: 0;
          }

          &:hover {
            background: #d9204e;
            color: black;
            border-color: #d9204e;
          }
          &:focus {
            outline: none;
            box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
          }
        }
      }
    }
  }
  @media only screen and (max-width: 600px) {
    width: 100%;
    .item {
      width: 100%;
      display: grid;
      grid-template-columns: 35% 35% 30%;
      grid-auto-rows: auto;

      .photo {
        display: flex;
        justify-content: center;
        align-items: center;
        .photo-img {
          width: 80px !important;
          height: 80px !important;
          border-radius: 500px;
          border: solid 0.2em #d9204e;
        }
      }

      .info-p {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        text-align: center;
        h2 {
          font-size: 20px;
          margin: 0;
          color: black;
        }
        h4 {
          width: 100%;
          haight: 100%;
          overflow: overlay;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
          font-weight: 200;
          margin: 0;
          color: black;
          font-size: 10px;
        }
      }
      .vote-b {
        .button-vote {
          border: solid 2px #d9204e;
          color: #f26924;
          z-index: 5000;
          padding: 0.9rem;
          font-size: 1em;
          margin: 0 auto;
          margin-top: 2px;
          width: 70px;
          height: 70px;
          display: flex;
          font-weight: 600;
          cursor: pointer;
          background: transparent;
          border-radius: 500px;
          transition: all ease-in-out 0.3s;
          justify-content: center;
          align-items: center;
          justify-self: center;
          align-self: center;
          flex-direction: column;
          color: black;
          h3 {
            margin: 0;
          }

          &:hover {
            opacity: 0.8;
            background: white;
            color: #d9204e;
            border-color: #d9204e;
          }
          &:focus {
            opacity: 0.8;
            outline: none;
            box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
          }
        }
        .button-vote-disabled {
          border: solid 2px #d9204e;
          color: #f26924;
          z-index: 5000;
          padding: 0.9rem;
          font-size: 1em;
          margin: 0 auto;
          margin-top: 2px;
          width: 70px;
          height: 70px;
          display: flex;
          font-weight: 600;
          background: #d9204e;
          border-radius: 500px;
          transition: all ease-in-out 0.3s;
          justify-content: center;
          align-items: center;
          justify-self: center;
          align-self: center;
          flex-direction: column;
          color: black;
          h3 {
            margin: 0;
          }

          &:hover {
            background: #d9204e;
            color: black;
            border-color: #d9204e;
          }
          &:focus {
            opacity: 0.8;
            outline: none;
            box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
          }
        }
      }
    }
  }
`;
