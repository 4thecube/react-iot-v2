import React from "react";
import Slider from "react-slick";

import SignInForm from "../../components/sign-in-form/SignInForm";
import "./HomePage.scss";

import fsSlide from "../../assets/fistSlide.png";
import scSlide from "../../assets/secondSlide.png";
import tdSlide from "../../assets/thirdSlide.png";

const HomePage = ({ user }) => {
  const settings = {
    // dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 4000,
    vertical: true,
    verticalSwiping: true,
  };
  console.log(user);
  return (
    <div className="home-page">
      <Slider {...settings}>
        <img
          className="home-background"
          src={fsSlide}
          alt="blured background"
        />
        <img
          className="home-background"
          src={scSlide}
          alt="blured background"
        />
        <img
          className="home-background"
          src={tdSlide}
          alt="blured background"
        />
        {/* <div className="home-background">1</div> */}
        {/* <div className="home-background" /> */}
        {/* <div className="home-background" /> */}
      </Slider>
      <SignInForm />
    </div>
  );
};

export default HomePage;
