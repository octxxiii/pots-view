import React, { useEffect } from "react";

const Home: React.FC = () => {
  useEffect(() => {
    const ballsLeft = document.querySelectorAll(
      ".sub-container-propeller--left > .ball"
    );
    const ballsRight = document.querySelectorAll(
      ".sub-container-propeller--right > .ball"
    );

    for (let i = 0; i < ballsLeft.length; i++) {
      ballsLeft[i].setAttribute("style", `animation-delay: ${i * 100}ms`);
      ballsRight[i].setAttribute("style", `animation-delay: ${i * 100}ms`);
    }
  }, []);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css?family=Poiret+One"
        rel="stylesheet"
      />
      <div className="wrapper">
        <div className="box box--top"></div>
        <div className="container-message">
          <h1>Sequencing data</h1>
        </div>
        <div className="container-propeller">
          <div className="sub-container-propeller--left">
            {[...Array(40)].map((_, i) => (
              <div key={i} className="ball"></div>
            ))}
          </div>
          <div className="sub-container-propeller--right">
            {[...Array(40)].map((_, i) => (
              <div key={i} className="ball"></div>
            ))}
          </div>
        </div>
        <div className="box box--bottom"></div>
      </div>
    </>
  );
};

export default Home;
