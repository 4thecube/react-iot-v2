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
  const [daysCount, setDaysCount] = useState(0);
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
      setDaysCount(res);
    };
    if (special) {
      countData(data);
    }
  }, [data, special]);

  const isNanDataCheck = isNaN(data) ? "No data" : data;

  console.log(isNanDataCheck);
  console.log(daysCount);
  return (
    <div className={`${customClassName} text-block`}>
      <h2 className="title">{title}</h2>
      <div className="body">
        {data ? (
          <>
            <span
              className={`${daysCount === "today" ? "today" : "not-today"} ${
                isNaN(data) && !special ? "nan-data" : ""
              } data`}
            >
              {special ? daysCount : isNanDataCheck}
            </span>
            {isNanDataCheck === "No data" ? (
              special ? (
                daysCount >= 2 ? (
                  <span className="subtitle"> days ago</span>
                ) : null
              ) : null
            ) : (
              <span className="subtitle">{subtitle ? subtitle : special}</span>
            )}
          </>
        ) : (
          <Loader size="small-loader" />
        )}
      </div>
    </div>
  );
};

export default TextBlock;
