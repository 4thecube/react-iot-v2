import React from 'react';

import './CustomButton.scss';

const CustomButton = ({
  children,
  login,
  logout,
  onClickAction,
  customClassName,
}) => {
  return (
    <button
      onClick={onClickAction}
      className={`${login ? 'green' : ''} ${logout ? 'red' : ''} ${
        customClassName ? customClassName : ''
      } custom-button`}
    >
      {children}
    </button>
  );
};

export default CustomButton;
