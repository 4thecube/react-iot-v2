import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import Loader from '../loader/Loader.component';
import './MeteodataList.styles.scss';

const MeteodataList = ({ data, size, hasButton }) => {
  const [newClassName, setNewClassName] = useState(
    size === 'small-list' ? _.first(data) : null
  );

  useEffect(() => {
    setNewClassName((prevState) =>
      prevState !== _.first(data) ? 'newClass' : 'Fuck'
    );
  }, [data]);

  return (
    <div className={`${size} list`}>
      {data.length ? (
        <table className="meteodata-list" cellSpacing="0" cellPadding="0">
          <thead>
            <tr className="header">
              <th className="header-option">Date</th>
              <th className="header-option">Temperature</th>
              <th className="header-option">Humidity</th>
              <th className="header-option">Raining Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((element) => (
              <tr className={` ${newClassName} data`} key={element.timeStamp}>
                <td className={' field date-stamp'}>
                  {element.dayStamp + ' ' + element.timeStamp}
                </td>
                <td className=" field temperature">
                  {element.temperature.toFixed(1)}°C
                </td>
                <td className="field humidity">
                  {element.humidity.toFixed(2)} %
                </td>
                <td className="field isRaining">
                  <span className="block">
                    {element.rain > 1000 ? (
                      <p message="Dry" className=" false"></p>
                    ) : (
                      <p message="Rain" className="true"></p>
                    )}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
          {hasButton ? (
            <div className="button-background">
              {
                //TODO: Convert to Link tag to="/all"
              }
              <Link to="/all" className="button">
                SHOW ALL
              </Link>
            </div>
          ) : null}
        </table>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default React.memo(MeteodataList);
