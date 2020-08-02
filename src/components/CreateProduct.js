import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import styled, { keyframes } from "styled-components";
import { NavLink, withRouter } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_PRODUCT } from "../helpers/graphql/mutations/index";
import Spinner from "../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import Input from "../components/Input";
import Button from "../components/Button";
import Card from "../components/Card";
import { MdSave } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { storage } from "../components/firebaseconfig";
import { IoIosAdd } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

export default function CreateP(props) {
  const [registerProduct, { data, loading, error }] = useMutation(
    CREATE_PRODUCT
  );
  const [Fname, setName] = React.useState("");
  const [nameE, setNameE] = React.useState(null);
  const [description, setDescription] = React.useState("");
  const [descriptionE, setDescriptionE] = React.useState(null);
  const [errorF, setErrorF] = React.useState(true);
  const [link, setLink] = React.useState("");
  const [logo, setLogo] = React.useState(null);
  const [logoE, setLogoE] = React.useState(null);
  const [images, setImages] = React.useState([]);
  const [image, setImage] = React.useState(null);
  const [imagesE, setImagesE] = React.useState(null);
  const [linkE, setLinkE] = React.useState(null);
  const [step1, setStep1] = React.useState(true);
  const [step2, setStep2] = React.useState(false);
  const [step3, setStep3] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [url, setUrl] = React.useState(null);
  const [urlImage, setUrlImage] = React.useState(null);
  const [done, setDone] = React.useState(false);
  const [loadingImage, setLoading] = React.useState(false);

  const { _id, role, name, lastName, mail } = useSelector((state) => ({
    ...state.User,
  }));

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleLink = (e) => {
    setLink(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleStep1 = (e) => {
    if (Fname && link) {
      setStep1(false);
      setStep2(true);
    }
    if (!Fname) {
      setNameE("Required Field");
    }
    if (!link) {
      setLinkE("Required Field");
    }
  };
  const handleStep2 = (e) => {
    if (description) {
      setStep2(false);
      setStep3(true);
    }
    if (!description) {
      setDescriptionE("Required Field");
    }
  };
  const handleStep3 = (e) => {
    setStep3(false);
  };

  const handleSub = async (e) => {
    const { data } = await registerProduct({
      variables: {
        productInput: {
          user: _id,
          name: Fname,
          link: link,
          description: description,
          logo: url,
          images: images,
        },
      },
    });
    if (data) {
      setDone(true);
    }
  };

  return (
    <>
      <StyledSidebar color={props.color}>
        {logoE ? (
          <div className="error">
            <div className="error-message">
              <h4>{logoE}</h4>
              <button
                className="boton-error"
                onClick={() => {
                  setLogoE(null);
                }}
              >
                ACCEPT
              </button>
            </div>
          </div>
        ) : null}
        {imagesE ? (
          <div className="error">
            <div className="error-message">
              <h4>{imagesE}</h4>
              <button
                className="boton-error"
                onClick={() => {
                  setImagesE(null);
                }}
              >
                ACCEPT
              </button>
            </div>
          </div>
        ) : null}
        {loadingImage ? (
          <div className="styled-spinner">
            <div className="spinner">
              <Spinner color="white" />
            </div>
          </div>
        ) : null}
        <div className="login">
          {!done ? <h1>Add a Product</h1> : null}

          <div className="side">
            {done ? (
              <div className="error-m">
                <div className="error-message">
                  <h4>Product Has Been Added!</h4>

                  <Button
                    onClick={() => {
                      window.location.reload(false);
                    }}
                    color="white"
                    color2="#ff874c"
                    color3="#ff874c"
                  ></Button>
                </div>
              </div>
            ) : (
              <>
                {step1 && !step2 && !step3 ? (
                  <Formik
                    initialValues={{
                      Name: Fname,
                      Description: description,
                      Link: link,
                    }}
                    validate={(values) => {
                      const errors = {};

                      return console.log(errors);
                    }}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                      /// code here
                      //event.preventDefault();
                      setSubmitting(true);

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
                      <form className="form">
                        <Input
                          value={Fname}
                          label="Enter the name of the Product "
                          id="Fname"
                          name="Fname"
                          type="text"
                          onChange={handleName}
                          onBlur={handleBlur}
                          color="white"
                        />
                        {nameE ? (
                          <div className="error">
                            <h4>{nameE}</h4>
                          </div>
                        ) : null}
                        <Input
                          value={link}
                          label="Enter the link of your Product"
                          id="link"
                          name="link"
                          type="text"
                          onChange={handleLink}
                          onBlur={handleBlur}
                          color="white"
                        />
                        {linkE ? (
                          <div className="error">
                            <h4>{linkE}</h4>
                          </div>
                        ) : null}

                        <div className="buttonC">
                          <Button
                            color2="#ff874c"
                            type="submit"
                            onClick={handleStep1}
                            block
                          ></Button>
                        </div>
                      </form>
                    )}
                  </Formik>
                ) : null}
                {!step1 && step2 && !step3 ? (
                  <Formik
                    initialValues={{
                      Description: description,
                    }}
                    validate={(values) => {
                      const errors = {};

                      return console.log(errors);
                    }}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                      /// code here
                      //event.preventDefault();
                      setSubmitting(true);

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
                      <form className="form">
                        <label className="lab">
                          Description
                          <textarea
                            className="cont"
                            value={description}
                            onChange={handleDescription}
                          />
                        </label>
                        {descriptionE ? (
                          <div className="error">
                            <h4>{descriptionE}</h4>
                          </div>
                        ) : null}

                        <div className="buttonC">
                          <Button
                            color2="#ff874c"
                            type="submit"
                            onClick={handleStep2}
                            block
                          ></Button>
                        </div>
                      </form>
                    )}
                  </Formik>
                ) : null}
                {!step1 && !step2 && step3 ? (
                  <Formik
                    initialValues={{
                      logo: null,
                    }}
                    validate={(values) => {
                      const errors = {};

                      return errors;
                    }}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                      /// code here
                      //event.preventDefault();
                      setLoading(true);
                      setSubmitting(true);

                      let image = new FormData();
                      let file = document.querySelector("#photoId");
                      image.append("image", file.files[0]);
                      console.log(image);
                      console.log("Loading", loadingImage);
                      if (logo) {
                        const uploadTask = storage
                          .ref(`images/${logo.name}`)
                          .put(logo);
                        uploadTask.on(
                          "state_changed",
                          (snapshot) => {
                            const progress = Math.round(
                              (snapshot.bytesTransfered / snapshot.totalBytes) *
                                100
                            );
                            setProgress(progress);
                          },
                          (error) => {
                            setLogoE(error);
                            console.log(error);
                          },
                          () => {
                            storage
                              .ref("images")
                              .child(logo.name)
                              .getDownloadURL()
                              .then(async (url) => {
                                setUrl(url);
                                setLoading(false);
                                setProgress(0);
                                setLogo(null);
                              });
                          }
                        );

                        // setStep3(false);
                      } else {
                        setLogoE("Please Select An Image to Upload");
                      }

                      setSubmitting(false);
                      resetForm();
                    }}
                  >
                    {({
                      values,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      setFieldValue,
                      isSubmitting,
                      /* and other goodies */
                    }) => (
                      <>
                        <Form
                          onSubmit={(e) => {
                            e.preventDefault();
                            setLoading(true);
                            e.preventDefault();
                            handleSubmit();
                          }}
                          className="formP"
                          encType="multipart/form-data"
                        >
                          <div className="edit">
                            {url ? (
                              <img className="photo" src={url} />
                            ) : (
                              <>{loadingImage ? <h4>Add a Logo</h4> : null}</>
                            )}

                            <Field
                              className="inputPhoto"
                              type="file"
                              name="image"
                              id="photoId"
                              style={{ display: "none" }}
                              onChange={(event) => {
                                const file = event.currentTarget.files[0];

                                if (file) {
                                  const fileType = file["type"];
                                  const validImageTypes = [
                                    "image/gif",
                                    "image/jpeg",
                                    "image/png",
                                  ];
                                  if (validImageTypes.includes(fileType)) {
                                    setLogoE(null);
                                    setLogo(event.currentTarget.files[0]);
                                    console.log(logo);
                                  } else {
                                    setLogoE(
                                      "Please Select An Image to Upload"
                                    );
                                    console.log(
                                      "Please Select An Image to Upload"
                                    );
                                  }
                                } else {
                                }
                              }}
                            />
                            {!logo ? (
                              <label
                                htmlFor="photoId"
                                className="settings"
                                type="button"
                                style={{ zIndex: "6000" }}
                              >
                                <IoIosAdd size="30px" />
                              </label>
                            ) : null}

                            {logo ? (
                              <Button
                                color2="#ff874c"
                                type="submit"
                                image={true}
                                block
                              ></Button>
                            ) : null}
                            {url ? (
                              <div className="buttonC">
                                <Button
                                  color2="#ff874c"
                                  type="submit"
                                  onClick={handleStep3}
                                ></Button>
                              </div>
                            ) : null}
                          </div>
                        </Form>
                      </>
                    )}
                  </Formik>
                ) : null}
                {!step1 && !step2 && !step3 ? (
                  <Formik
                    initialValues={{
                      logo: null,
                    }}
                    validate={(values) => {
                      const errors = {};

                      return errors;
                    }}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                      /// code here
                      //event.preventDefault();
                      setSubmitting(true);
                      setLoading(true);
                      let photo = new FormData();
                      let file = document.querySelector("#photoId");
                      photo.append("image", file.files[0]);

                      if (image) {
                        const uploadTask = storage
                          .ref(`images/${image.name}`)
                          .put(image);
                        uploadTask.on(
                          "state_changed",
                          (snapshot) => {
                            const progress = Math.round(
                              (snapshot.bytesTransfered / snapshot.totalBytes) *
                                100
                            );
                            setProgress(progress);
                          },
                          (error) => {
                            setImagesE(error);
                            console.log(error);
                          },
                          () => {
                            storage
                              .ref("images")
                              .child(image.name)
                              .getDownloadURL()
                              .then(async (url) => {
                                setUrlImage(url);
                                setProgress(0);
                                setImage(null);

                                setImages([...images, url]);
                              });
                          }
                        );
                        setLoading(false);
                        console.log(images);
                      } else {
                        setImagesE("Please Select An Image to Upload");
                      }

                      setSubmitting(false);
                      resetForm();
                    }}
                  >
                    {({
                      values,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      setFieldValue,
                      isSubmitting,
                      /* and other goodies */
                    }) => (
                      <>
                        <div className="gallery">
                          {images.length > 0 ? <Card images={images} /> : null}
                        </div>
                        <Form
                          onSubmit={(e) => {
                            e.preventDefault();
                            setLoading(true);
                            e.preventDefault();
                            handleSubmit();
                          }}
                          className="formP"
                          encType="multipart/form-data"
                        >
                          <div className="edit">
                            {images.length === 0 ? <h4>Add Images</h4> : null}
                            <Field
                              className="inputPhoto"
                              type="file"
                              name="image"
                              id="photoId"
                              style={{ display: "none" }}
                              onChange={(event) => {
                                const file = event.currentTarget.files[0];

                                if (file) {
                                  const fileType = file["type"];
                                  const validImageTypes = [
                                    "image/gif",
                                    "image/jpeg",
                                    "image/png",
                                  ];
                                  if (validImageTypes.includes(fileType)) {
                                    setImagesE(null);
                                    setImage(event.currentTarget.files[0]);
                                    console.log("Entre", image);
                                  } else {
                                    setImagesE(
                                      "Please Select An Image to Upload"
                                    );
                                    console.log(
                                      "Please Select An Image to Upload"
                                    );
                                  }
                                } else {
                                }
                              }}
                            />
                            {!image && images.length === 0 ? (
                              <label
                                htmlFor="photoId"
                                className="settings"
                                type="button"
                                style={{ zIndex: "1000" }}
                              >
                                <IoIosAdd size="30px" />
                              </label>
                            ) : null}
                            {images.length > 0 && !image ? (
                              <div className="two-button">
                                <label
                                  htmlFor="photoId"
                                  className="settings"
                                  type="button"
                                  style={{ zIndex: "1000" }}
                                >
                                  <IoIosAdd size="30px" />
                                </label>
                                <label
                                  color2="#ff874c"
                                  className="settings"
                                  type="button"
                                  style={{ marginLeft: "5px" }}
                                  onClick={handleSub}
                                >
                                  <IoIosArrowForward size="30px" />
                                </label>
                              </div>
                            ) : null}

                            {image ? (
                              <Button
                                color2="#ff874c"
                                type="submit"
                                image={true}
                                block
                              ></Button>
                            ) : null}
                          </div>
                        </Form>
                      </>
                    )}
                  </Formik>
                ) : null}
              </>
            )}
          </div>
        </div>
      </StyledSidebar>
    </>
  );
}

const StyledSidebar = styled.nav`
  @import url("https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap");
  display: flex;
  width: 100vw;
  height: 100vh;
  position: absolute;
  justify-content: center;
  align-items: center;
  z-index: 500;
  .error{
    display: flex;
    position: fixed;
    top:0;
    left:0;
    height: 100vh;
    width: 100vw;
    background:transparent;
    z-index: 3000;
    transition: all ease-in-out 0.3s;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    &:after {
      position: fixed;
      top: 0;
      left: 0;
      content: "";
      width: 100%;
      z-index: 1;
      height: 100%;
      background: #202124;
      opacity: 0.4;
    }

    .error-message{
      display: flex;
      position: absolute;
      height: 20vh;
      width: 30vw;
      background:#fafafa;
      z-index: 3000;
      top:50%;
      left:50%;
      transform:translate(-50%);
      padding-left:0.5em;
      padding-right:0.5em;
      text-align:center;
      
      flex-direction:column;
      justify-content:center;
      align-items:center;
      h4{
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        color:#F26924;
        font-size:1em;

  
      }
      .boton-error{
        border: solid 2px #F26924;
        color: white;
        padding: 0.6rem;
        font-size: 0.8em;
        width: 10vw;
        display: flex;
        font-weight: 600;
        cursor: pointer;
        background: #F26924;
        border-radius: 500px;
        transition: all ease-in-out 0.3s;
        justify-content: center;
        &:hover {
          opacity: 0.8;
          background: #F26924;
          color: white;
          border-color: #F26924;
        }
        &:focus {
          opacity: 0.8;
          outline: none;
          box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
        }

      }
    }}
  .styled-spinner{
    height: 100vh;
    width: 100vw;
    overflow-x: hidden;
    overflow-y: scroll;
    display: flex;
    position:absolute;
    .spinner{
        display:flex;
        position:absolute:
        z-index:3000;
        width:100%;
        height:100%;
        justify-content:center;
        align-items:center;
    
      }}

  .two-button {
    display: flex;
    flex-direction: row;
  }
  h4 {
    color: white;
  }
  .gallery {
    display: flex;
    align-items: center;
    justify-content: center;
  }
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
    width: 800px;
    height: 500px;
    background: #f89262;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    h1 {
      font-size: 50px;
      margin-bottom: 10px;
      margin-top: 0;
      color: white;
    }
    .side {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .photo {
        width: 200px;
        height: 200px;
        display: flex;
        margin: 0;
        margin-bottom: 0;
        border-radius: 500px;
        border: solid 0.2em white;
      }
      .lab {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;

        .cont {
          font-family: "Playfair Display", serif;
          width: 350px;
          height: 150px;
          display: flex;
          vertical-align: text-top;
          margin-top: 5px;
          border: 1px solid white;
          color: #f26924;
          &:focus {
            outline: none !important;
            border: 1px solid #f26924;
          }
        }
      }
    }
  }

  .settings {
    border: solid 2px white;
    color: #f26924;
    z-index: 6000;
    padding: 0.9rem;
    font-size: 1em;
    margin: 0 auto;
    margin-top: 2px;
    width: 40px;
    height: 40px;
    display: flex;
    font-weight: 600;
    cursor: pointer;
    background: white;
    border-radius: 500px;
    transition: all ease-in-out 0.3s;
    justify-content: center;
    align-items: center;
    justify-self: center;
    align-self: center;

    &:hover {
      opacity: 0.8;
      background: white;
      color: #f26924;
      border-color: white;
    }
    &:focus {
      opacity: 0.8;
      outline: none;
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
    }
  }

  @media only screen and (max-width: 800px) {
    .buttonC {
      margin-top: 1em;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .login {
      width: 90vw;
      top: 100px;
      height: 75vh;
      position: fixed;
      background: #f89262;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      .side {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .photo {
          width: 200px;
          height: 200px;
          display: flex;
          margin: 0;
          margin-bottom: 0;
          border-radius: 500px;
          border: solid 0.2em white;
        }
        .lab {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: white;

          .cont {
            font-family: "Playfair Display", serif;
            width: 70vw;
            height: 150px;
            display: flex;
            vertical-align: text-top;
            margin-top: 5px;
            border: 1px solid white;
            color: #f26924;
            &:focus {
              outline: none !important;
              border: 1px solid #f26924;
            }
          }
        }
      }
    }
    .error{
      display: flex;
      position: absolute;
      height: 100vh;
      width: 100vw;
      background:#fafafa;
      z-index: 3000;
      transition: all ease-in-out 0.3s;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      &:after {
        position: absolute;
        top: 0;
        left: 0;
        content: "";
        width: 100%;
        z-index: 1;
        height: 100%;
        background: #fafafa;
        opacity: 0.4;
      }
  
      .error-message{
        display: flex;
        position: absolute;
        height: 20vh;
        width: 80vw;
        background:#fafafa;
        z-index: 3000;
        top:50%;
        left:50%;
        transform:translate(-50%);
        padding-left:0.5em;
        padding-right:0.5em;
        text-align:center;
        
        flex-direction:column;
        justify-content:center;
        align-items:center;
        h4{
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
          Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
          color:#F26924;
          font-size:1em;
  
    
        }
        .boton-error{
          border: solid 2px #F26924;
          color: white;
          padding: 0.6rem;
          font-size: 0.8em;
          width: 30vw;
          display: flex;
          font-weight: 600;
          cursor: pointer;
          background: #F26924;
          border-radius: 500px;
          transition: all ease-in-out 0.3s;
          justify-content: center;
          &:hover {
            opacity: 0.8;
            background: #F26924;
            color: white;
            border-color: #F26924;
          }
          &:focus {
            opacity: 0.8;
            outline: none;
            box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
          }
  
        }
      }}
  }
`;
