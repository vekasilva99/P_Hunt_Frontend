import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Formik } from "formik";
import styled, { keyframes } from "styled-components";
import { NavLink, withRouter } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { REGISTER_USER } from "../helpers/graphql/mutations/index";
import Spinner from "../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import Input from "../components/Input";
import Button from "../components/Button";

export default function RegisterVoter(props) {
  const [register, { data, loading, error }] = useMutation(REGISTER_USER);
  const [emailE, setEmailE] = React.useState(null);
  const [nameE, setNameE] = React.useState(null);
  const [errorF, setErrorF] = React.useState(true);
  const [lNameE, setLNameE] = React.useState(null);
  const [passwordE, setPasswordE] = React.useState(null);
  const [loadingB, setLoading] = React.useState(false);

  return (
    <>
      <StyledSidebar color={props.color}>
        <div className="login">
          <div className="clear">
            <div className="line-1"></div>
            <div className="line-2"></div>
            <div className="line-3"></div>
            <div className="line-2"></div>
          </div>
          <div className="side">
            {data && data.createUser ? (
              <div className="error-m">
                <div className="error-message">
                  <h4>User Has Been Created!</h4>

                  <Button
                    onClick={() => {
                      window.location.reload(false);
                    }}
                    color="white"
                    color2="#ff3366"
                    color3="#ff3366"
                  ></Button>
                </div>
              </div>
            ) : (
              <div className="login-box">
                <h1>Register</h1>
                <Formik
                  initialValues={{
                    Email: "",
                    Password: "",
                    Password2: "",
                    Phone: "",
                    FName: "",
                    LName: "",
                  }}
                  validate={(values) => {
                    const errors = {};
                    if (!values.Email) {
                      errors.Email = "Required Field";
                      setEmailE("Required Field");
                    } else if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                        values.Email
                      )
                    ) {
                      errors.email = "Invalid Email";
                      setEmailE("Invalid Email");
                    }
                    if (
                      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                        values.Email
                      )
                    ) {
                      setEmailE(null);
                    }
                    if (!values.Password) {
                      errors.Password = "Required Field";
                      setPasswordE("Required Field");
                    } else if (values.Password.length < 9) {
                      errors.Password = "Password too short";
                      setPasswordE("Password too short");
                    }
                    if (values.Password.length >= 9) {
                      setPasswordE(null);
                    }

                    if (!errors.Password && !errors.Email) {
                      setErrorF(false);
                    }
                    if (!values.FName) {
                      setNameE("Required Field");
                    }
                    if (!values.LName) {
                      setLNameE("Required Field");
                    }

                    if (values.FName) {
                      setNameE(null);
                    }
                    if (values.LName) {
                      setLNameE(null);
                    }

                    return console.log(errors);
                  }}
                  onSubmit={async (values, { setSubmitting, resetForm }) => {
                    /// code here
                    //event.preventDefault();
                    setSubmitting(true);
                    if (
                      emailE === null &&
                      passwordE === null &&
                      lNameE === null &&
                      nameE === null
                    ) {
                      let submitUser = [
                        {
                          FirstName: values.FName,
                          LastName: values.LName,
                          Password: values.Password,
                          Email: values.Email,
                        },
                      ];

                      const { data } = await register({
                        variables: {
                          userInput: {
                            name: submitUser[0].FirstName,
                            lastName: submitUser[0].LastName,
                            mail: submitUser[0].Email,
                            password: submitUser[0].Password,
                            role: "VOTER",
                          },
                        },
                      });
                    }
                    setLoading(false);
                    setSubmitting(false);
                    resetForm();
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                  }) => (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setLoading(true);
                        e.preventDefault();
                        handleSubmit();
                      }}
                      className="form"
                    >
                      <Input
                        value={values.FName}
                        label="Enter your Name"
                        id="FName"
                        name="FName"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        color="white"
                      />
                      {nameE ? (
                        <div className="error">
                          <h4>{nameE}</h4>
                        </div>
                      ) : null}
                      <Input
                        value={values.LName}
                        label="Enter your Last Name"
                        id="LName"
                        name="LName"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        color="white"
                      />
                      {lNameE ? (
                        <div className="error">
                          <h4>{lNameE}</h4>
                        </div>
                      ) : null}
                      <Input
                        value={values.Email}
                        label="Enter your email"
                        id="Email"
                        name="Email"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        color="white"
                      />
                      {emailE ? (
                        <div className="error">
                          <h4>{emailE}</h4>
                        </div>
                      ) : null}

                      <Input
                        value={values.Password}
                        label="Enter your password"
                        id="Password"
                        type="password"
                        name="Password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        color="white"
                      />
                      {passwordE ? (
                        <div className="error">
                          <h4>{passwordE}</h4>
                        </div>
                      ) : null}

                      <div className="buttonC">
                        {loadingB ? (
                          <Spinner color="white" />
                        ) : (
                          <Button
                            color={props.color}
                            type="submit"
                            block
                          ></Button>
                        )}
                      </div>
                      {error && error.graphQLErrors[0] ? (
                        <div className="error">
                          {error.graphQLErrors[0].message}
                        </div>
                      ) : error && error.networkError ? (
                        <div className="error">Network error</div>
                      ) : null}
                    </form>
                  )}
                </Formik>
              </div>
            )}
          </div>
        </div>
      </StyledSidebar>
    </>
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
const StyledSidebar = styled.nav`
  .error-m {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
    background: transparent;
    z-index: 3000;
    transition: all ease-in-out 0.3s;

    &:after {
      position: fixed;
      top: 0;
      left: 0;
      content: "";
      width: 100%;
      z-index: 1;
      height: 100%;

      opacity: 0.4;
    }

    .error-message {
      display: flex;
      height: auto;
      width: 500px;

      z-index: 3000;

      padding-left: 0.5em;
      padding-right: 0.5em;
      text-align: center;

      flex-direction: column;
      justify-content: center;
      align-items: center;
      h4 {
        color: #fafafa;
        font-size: 60px;
        margin-bottom: 0;
      }
    }
  }
  .error {
    width: 100%;
    text-align: center;
    margin-top: 1px;
    color: white;
    h4 {
      font-size: 10px;
    }
  }
  .buttonC {
    margin-top: 2em;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .login {
    position: fixed;
    z-index: 2000;
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-areas: "clear side";
    transform: translateY(0);
    transition: transform 0.4s ease-in;
  }

  .clear {
    background: white;
    width: 50vw;
    height: 100%;
    grid-area: clear;
    opacity: 0.5;
    margin: auto;
    display: grid;
    grid-auto-rows: 200px;
    font-size: 3em;
    .line-2 {
      background-color: #d9204e;
      text-align: center;
      z-index: 1;
      height: 100%;
      transform: skewY(11deg);
      animation: ${AnimationLine1} 10s linear infinite;
    }

    .line-1 {
      background-color: #ff3366;
      z-index: 1;
      height: 100%;
      transform: skewY(-20deg);
      animation: ${AnimationLine2} 10s linear infinite;
    }
    .line-3 {
      background-color: #ff3366;
      z-index: 1;
      height: 100%;
      transform: skewY(-20deg);
      animation: ${AnimationLine2} 10s linear infinite;
    }
  }

  .side {
    background: ${(props) => props.color};
    width: 50vw;
    height: 100%;
    grid-area: side;

    .login-box {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;

      h1 {
        font-size: 50px;
        color: white;
        margin-top: 50px;
        margin-bottom: 10px;
        display: flex;
        justify-self: center;
        justify-text: center;
        height: 35px;
        border-bottom: 30px solid rgba(255, 255, 255, 0.4);
        max-width: 200px;
      }

      .form {
        display: flex;
        flex-direction: column;
        max-width: 400px;
        margin-top: 0;
      }
    }
  }
  @media only screen and (max-width: 1000px) {
    overflow: scroll;
    .clear {
      background: white;
      width: 0%;
      height: 0%;
      grid-area: clear;
      opacity: 0.5;
    }
    .buttonC {
      margin-top: 1em;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .side {
      background: ${(props) => props.color};
      width: 100vw;
      height: 100vh;
      grid-area: side;
      overflow-y: scroll;
      .login-box {
        margin-top: 40px;
      }
    }
  }
`;
