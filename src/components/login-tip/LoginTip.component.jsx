import React from "react";

import "./LoginTip.styles.scss";

const LoginTip = () => {
  return (
    <div className="login-tip">
      <span className="login-t-title">USE THE FOLLOWING CREDENTIALS</span>
      <div className="login-t-credentials">
        <span className="login-t-field">
          Email: <span className="login-t-f-value"> dot@dot.ua</span>
        </span>
        <span className="login-t-field">
          Password: <span className="login-t-f-value"> 12345678</span>
        </span>
      </div>
    </div>
  );
};

export default LoginTip;
