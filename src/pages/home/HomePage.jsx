import React from "react";
import Slider from "react-slick";

import SignInForm from "../../components/sign-in-form/SignInForm";
import SliderImage from "../../components/slider-image/SliderImage.component";
import LoginTip from "../../components/login-tip/LoginTip.component";

import frSlide from "../../assets/fistSlide.png";
import scSlide from "../../assets/secondSlide.png";
import thSlide from "../../assets/thirdSlide.png";

import "./HomePage.scss";
const slideImages = [frSlide, scSlide, thSlide];

const HomePage = () => {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 1500,
    vertical: true,
    verticalSwiping: true,
  };

  return (
    <div className="home-page">
      <LoginTip />
      <Slider {...settings}>
        {slideImages.map((img) => (
          <SliderImage slide={img} />
        ))}
      </Slider>
      <SignInForm />
    </div>
  );
};

export default HomePage;
