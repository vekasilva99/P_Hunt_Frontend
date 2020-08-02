import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Ribbon from "../components/Ribbon";
import Navbar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import ButtonB from "../components/ButtonB";
import { Link, animateScroll as scroll } from "react-scroll";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";

export default function Home() {
  const [sidebar, setSidebar] = React.useState(false);
  const [color, setColor] = React.useState("#C6E1E7");

  const close = (e) => setSidebar(false);
  const open = (e) => {
    setSidebar(true);
    console.log(sidebar);
  };
  const prevScrollY = useRef(0);

  const [goingUp, setGoingUp] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      console.log(goingUp, currentScrollY, window.innerHeight);
      if (prevScrollY.current < currentScrollY && goingUp) {
        setGoingUp(false);
        window.scrollTo(0, window.innerHeight);
      }
      if (prevScrollY.current > currentScrollY && !goingUp) {
        setGoingUp(true);
      }
      console.log(currentScrollY, window.innerHeight);

      if (
        prevScrollY.current < currentScrollY &&
        currentScrollY < window.innerHeight
      ) {
        window.scrollTo(0, window.innerHeight + 1);
        setColor("#D9204E");
      }
      if (
        prevScrollY.current < currentScrollY &&
        currentScrollY < 2 * window.innerHeight &&
        currentScrollY > window.innerHeight + 10 &&
        !goingUp
      ) {
        setColor("#F26924");
        window.scrollTo({
          top: `${2 * window.innerHeight}`,
          behavior: "auto",
        });
      }
      if (
        prevScrollY.current > currentScrollY &&
        currentScrollY < 2 * window.innerHeight - 10 &&
        currentScrollY > window.innerHeight &&
        goingUp
      ) {
        setColor("#D9204E");
        window.scrollTo(0, window.innerHeight + 1);
      }
      if (
        prevScrollY.current > currentScrollY &&
        currentScrollY < window.innerHeight - 10 &&
        goingUp
      ) {
        setColor("#C6E1E7");
        window.scrollTo({
          top: 0,
          behavior: "auto",
        });
      }

      prevScrollY.current = currentScrollY;
      console.log(goingUp, currentScrollY, window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [goingUp]);

  return (
    <HomeStyle>
      <Navbar handleSidebar={open} />
      <Sidebar handleSidebar={close} sidebar={sidebar} color={color} />
      <div className="header">
        <div className="info">
          <h1>P</h1>
          <div className="info-1">
            <h2>Product Hunt</h2>
            <h4>
              The perfect place to make your own product known and to discover a
              lot more.{" "}
            </h4>
          </div>
        </div>
        <Ribbon color1="#C6E1E7" color2="#B0C8CF" />
      </div>
      <div className="voter">
        <div className="info">
          <h1>V</h1>
          <div className="info-1">
            <h2>Voter</h2>
            <h4>Vote for your favorite products every day. </h4>
          </div>
          <div className="buttonC">
            <ButtonB
              link="/login"
              color="#D9204E"
              type="submit"
              block
            ></ButtonB>
          </div>
        </div>
        <Ribbon color1="#D9204E" color2="#FF3366" />
      </div>
      <div className="founder">
        <div className="info">
          <h1>F</h1>
          <div className="info-1">
            <h2>Founder</h2>
            <h4>Showcase your own products.</h4>
          </div>
          <div className="buttonC">
            <ButtonB
              link="/loginf"
              color="#F26924"
              type="submit"
              block
            ></ButtonB>
          </div>
        </div>
        <Ribbon color1="#F26924" color2="#FF874C" />
      </div>
    </HomeStyle>
  );
}

const HomeStyle = styled.section`
  max-height: 100vh;
  background: white;
  width: 100%;
  @import url("https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap");
  .header {
    width: 100vw;
    height: 100vh;

    .info {
      position: absolute;
      width: 900px;
      margin: 0;
      margin-top: 150px;
      margin-left: 200px;
      display: grid;
      grid-template-columns: 20% 80%;
      grid-auto-rows: auto;

      h1 {
        padding: 0;
        justify-self: flex-start;
        align-self: flex-start;
        font-size: 200px;
        z-index: 200;
        margin-top: 0;
      }
      .info-1 {
        z-index: 300;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
      }
      .buttonC {
        margin-top: 0;
        width: 60%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
      h2 {
        font-family: "Playfair Display", serif;
        font-size: 32px;
        font-weight: 400;
        margin: 0;
        margin-top: -120px;
        margin-bottom: 20px;
      }
      h4 {
        font-family: "Playfair Display", serif;
        font-size: 15px;
        font-weight: 400;
        margin: 0;
      }
    }
  }

  .voter {
    height: 100vh;
    width: 100vw;

    .info {
      position: absolute;
      width: 900px;
      margin: 0;
      margin-top: 150px;
      margin-left: 200px;
      display: grid;
      grid-template-columns: 20% 60% 20%;
      grid-auto-rows: auto;
      h1 {
        padding: 0;
        justify-self: flex-start;
        align-self: flex-start;
        font-size: 200px;
        z-index: 200;
        margin-top: 0;
      }
      .info-1 {
        z-index: 300;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
      }
      .buttonC {
        margin-top: 0;
        width: 60%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
      h2 {
        font-family: "Playfair Display", serif;
        font-size: 32px;
        font-weight: 400;
        margin: 0;
        margin-top: -120px;
        margin-bottom: 20px;
      }
      h4 {
        font-family: "Playfair Display", serif;
        font-size: 15px;
        font-weight: 400;
        margin: 0;
      }
    }
  }

  .founder {
    height: 100vh;
    width: 100vw;
    .info {
      position: absolute;
      width: 900px;
      margin: 0;
      margin-top: 150px;
      margin-left: 200px;
      display: grid;
      grid-template-columns: 20% 60% 20%;
      grid-auto-rows: auto;
      h1 {
        padding: 0;
        justify-self: flex-start;
        align-self: flex-start;
        font-size: 200px;
        z-index: 200;
        margin-top: 0;
      }
      .info-1 {
        z-index: 300;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
      }
      .buttonC {
        margin-top: 0;
        width: 60%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
      h2 {
        font-family: "Playfair Display", serif;
        font-size: 32px;
        font-weight: 400;
        margin: 0;
        margin-top: -120px;
        margin-bottom: 20px;
      }
      h4 {
        font-family: "Playfair Display", serif;
        font-size: 15px;
        font-weight: 400;
        margin: 0;
      }
    }
  }

  @media only screen and (min-width: 1400px) {
    .header{
      .info{
        margin-left: 300px;
      }
    }

  }
  @media only screen and (min-width: 1700px) {
    .header{
      .info{
        margin-left: 350px;
      }
    }

  }

  @media only screen and (min-width: 2000px) {
    .header{
      .info{
        margin-left: 500px;
      }
    }

  }

  @media only screen and (max-width: 1150px) {
    .header {
      width: 100vw;
      height: 100vh;

      .info {
        position: absolute;
        width: 100vw;
        margin: 0;
        margin-top: 150px;
        margin-left: 0;
        display: flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        text-align-center;

        h1 {
          padding: 0;
          justify-self: center;
          align-self: center;
          font-size: 200px;
          z-index: 200;
          margin:0;
          margin-top: 0;
        }
        .info-1 {
          margin:0;
          z-index: 300;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align:center;
        }
        h2 {
          margin-top: 0;
          margin-bottom: 0;
        }
      }
    }
    .voter {
      height: 100vh;
      width: 100vw;
      .info {
        position: absolute;
        width: 100vw;
        margin: 0;
        margin-top: 150px;
        margin-left: 0;
        display: flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        text-align-center;

        h1 {
          padding: 0;
          justify-self: center;
          align-self: center;
          font-size: 200px;
          z-index: 200;
          margin:0;
          margin-top: 0;
        }
        .buttonC {
          margin-top: 5px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .info-1 {
          margin:0;
          z-index: 300;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align:center;
        }
        h2 {
          margin-top: 0;
          margin-bottom: 0;
        }
      }
    }

    .founder {
      height: 100vh;
      width: 100vw;
      .info {
        position: absolute;
        width: 100vw;
        margin: 0;
        margin-top: 150px;
        margin-left: 0;
        display: flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        text-align-center;

        h1 {
          padding: 0;
          justify-self: center;
          align-self: center;
          font-size: 200px;
          z-index: 200;
          margin:0;
          margin-top: 0;
        }
        .buttonC {
          margin-top: 5px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .info-1 {
          margin:0;
          z-index: 300;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align:center;
        }
        h2 {
          margin-top: 0;
          margin-bottom: 0;
        }
      }
    }
  
  }
`;
