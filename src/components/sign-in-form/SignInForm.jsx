import React, { useRef, useState } from "react";
import { connect } from "react-redux";

import app from "../../firebase";
import CustomButton from "../custom-button/CustomButton";
import InputField from "../input-field/InputField";
import { closeMenu } from "../../redux/hamburger-button/hamburger.action";

import "./SignInForm.scss";

const SignInForm = ({ closeMenu }) => {
  // in this component we wanna hold state/handleChange/onSubmit
  const emailRef = useRef();
  const passwordRef = useRef();
  const auth = app.auth();
  const [authError, setAuthError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await auth
        .signInWithEmailAndPassword(
          emailRef.current.value,
          passwordRef.current.value
        )
        .catch((error) => {
          setAuthError(error.message);
        });
    } catch (error) {}
  };

  console.log(authError);

  return (
    <div className="sign-in-form">
      <h2 className="title">Sign In </h2>
      <form onSubmit={handleSubmit}>
        <InputField name="email" type="email" ref={emailRef} label="email" />
        <InputField
          name="password"
          type="password"
          ref={passwordRef}
          label="password"
        />
        <div className="sign-in-error">{authError}</div>
        <div className="buttons">
          <CustomButton login type="submit" onClickAction={closeMenu}>
            SIGN IN
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  closeMenu: () => dispatch(closeMenu()),
});

export default connect(null, mapDispatchToProps)(SignInForm);
