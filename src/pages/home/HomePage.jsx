import React from "react";
import Slider from "react-slick";
import app from "../../firebase";

import SignInForm from "../../components/sign-in-form/SignInForm";
import "./HomePage.scss";

import frSlide from "../../assets/fistSlide.png";
import scSlide from "../../assets/secondSlide.png";
import thSlide from "../../assets/thirdSlide.png";
import SliderImage from "../../components/slider-image/SliderImage.component";

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
