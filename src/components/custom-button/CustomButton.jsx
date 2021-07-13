import React from "react";

import "./CustomButton.scss";

const CustomButton = ({ children, login, logout, onClickAction }) => {
  return (
    <button
      onClick={onClickAction}
      className={`${login ? "green" : ""} ${logout ? "red" : ""} custom-button`}
    >
      {children}
    </button>
  );
};

export default CustomButton;
