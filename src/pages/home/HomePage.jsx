import React from "react";

import SignInForm from "../../components/sign-in-form/SignInForm";

import "./HomePage.scss";

const HomePage = ({ user }) => {
  console.log(user);
  return (
    <div className="home-page">
      <SignInForm />
    </div>
  );
};

export default HomePage;
