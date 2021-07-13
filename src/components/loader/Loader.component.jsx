import React from "react";

import "./Loader.styles.scss";

const Loader = ({ size }) => {
  return (
    <div className={`loader `}>
      <div className={`${size} lds-dual-ring`}></div>
    </div>
  );
};

export default Loader;
