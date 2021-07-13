import React from "react";

import Loader from "../loader/Loader.component";
import "./TextBlock.styles.scss";

const TextBlock = ({ title, data, subtitle }) => {
  return (
    <div className="text-block">
      <h2 className="title">{title}</h2>
      <div className="body">
        {data ? (
          <>
            <span className="data">{data}</span>
            {subtitle && <span className="subtitle">{subtitle}</span>}
          </>
        ) : (
          <Loader size="small-loader" />
        )}
      </div>
    </div>
  );
};

export default TextBlock;
