import React, { useEffect, useState } from "react";

import Loader from "../loader/Loader.component";
import "./TextBlock.styles.scss";

const TextBlock = ({
  title,
  data,
  subtitle,
  special = false,
  customClassName = "",
}) => {
  const [fuckThisShit, setFuckThisShit] = useState(0);
  useEffect(() => {
    const countData = (dataAsArgs) => {
      let res = Math.floor(
        (Date.now() - Date.parse(new Date(dataAsArgs.split("-").join(",")))) /
          3600000 /
          24
      );
      if (res === 0) {
        res = "today";
      } else if (res === 1) {
        res = "yesterday";
      }
      setFuckThisShit(res);
    };
    if (special) {
      countData(data);
    }
  }, [data, special]);
  return (
    <div className={`${customClassName} text-block`}>
      <h2 className="title">{title}</h2>
      <div className="body">
        {data ? (
          <>
            <span
              className={`${
                fuckThisShit === "today" ? "today" : "not-today"
              } data`}
            >
              {special ? fuckThisShit : data}
            </span>
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
