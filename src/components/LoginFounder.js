import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Formik } from "formik";
import styled, { keyframes } from "styled-components";
import { NavLink, withRouter } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN_USER } from "../helpers/graphql/mutations/index";
import Spinner from "../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Sidebar(props) {
  const [login, { data, loading, error }] = useMutation(LOGIN_USER);
  const [loadingB, setLoading] = React.useState(false);

  const { name, role } = useSelector((state) => ({
    ...state.User,
  }));
  const [log, setLog] = useState(false);

  const dispatch = useDispatch();
  let route;
  useEffect(() => {
    if (data && data.userLogin) {
      if (data.userLogin.user.role === "VOTER") {
        route = "/user";
      } else if (data.userLogin.user.role === "ADMIN") {
        route = "/";
      } else {
        route = "/";
      }
      console.log("ruta" + route);
    }
  }, [data, route]);
  return log && name ? (
    <Redirect to="/founder/myproducts" />
  ) : (
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
            <div className="login-box">
              <h1>Login</h1>
              <Formik
                initialValues={{
                  Email: "",
                  Password: "",
                }}
                validate={(values) => {
                  const errors = {};
                  if (!values.Email) {
                    errors.Email = "Required Field";
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                      values.Email
                    )
                  )
                    if (!values.Password) {
                      errors.Password = "Required Field";
                    }

                  return errors;
                }}
                onSubmit={async (
                  { Email, Password },
                  { setSubmitting, resetForm }
                ) => {
                  /// code here
                  //event.preventDefault();
                  setSubmitting(true);
                  if (Email.trim() === 0 || Password.trim() === 0) {
                    return;
                  }
                  console.log("llega aca");
                  console.log(Email, Password);
                  try {
                    const { data } = await login({
                      variables: {
                        mail: Email,
                        password: Password,
                        role: "FOUNDER",
                      },
                    });
                    console.log("Hola");
                    if (data && data.userLogin) {
                      localStorage.setItem("token", data.userLogin.token);
                      dispatch({
                        type: "CURRENT_USER",
                        payload: {
                          token: data.userLogin.token,
                          ...data.userLogin.user,
                        },
                      });

                      setLog(true);
                    }
                  } catch (err) {
                    console.log(err);
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
                }) =>
                  loading ? (
                    <Spinner color="white"></Spinner>
                  ) : (
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
                        value={values.Email}
                        label="Enter your email"
                        id="Email"
                        name="Email"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        color="white"
                      />

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

                      <div className="buttonC">
                        {loadingB ? (
                          <Spinner />
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
                  )
                }
              </Formik>
            </div>
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
  .error {
    width: 100%;
    text-align: center;
    margin-top: 1em;
    color: white;
  }
  .buttonC {
    margin-top: 3em;
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
      background-color: #f26924;
      text-align: center;
      z-index: 1;
      height: 100%;
      transform: skewY(11deg);
      animation: ${AnimationLine1} 10s linear infinite;
    }

    .line-1 {
      background-color: #ff874c;
      z-index: 1;
      height: 100%;
      transform: skewY(-20deg);
      animation: ${AnimationLine2} 10s linear infinite;
    }
    .line-3 {
      background-color: #ff874c;
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
        margin-top: 80px;
        display: flex;
        justify-self: center;
        justify-text: center;
        height: 35px;
        border-bottom: 30px solid rgba(255, 255, 255, 0.4);
        max-width: 150px;
      }

      .form {
        display: flex;
        flex-direction: column;
        max-width: 400px;
      }
    }
  }

  @media only screen and (max-width: 1000px) {
    .clear {
      background: white;
      width: 0%;
      height: 0%;
      grid-area: clear;
      opacity: 0.5;
    }

    .side {
      background: ${(props) => props.color};
      width: 100vw;
      height: 100vh;
      grid-area: side;
    }
  }
`;
