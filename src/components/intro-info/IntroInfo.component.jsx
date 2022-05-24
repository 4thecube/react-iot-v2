import React from 'react';

import './IntroInfo.styles.scss';

const IntroInfo = () => {
  return (
    <div className="intro-info">
      <span className="title">Master's project</span>
      <span className="body">
        This project is developed using <span className="yellow">ESP8266</span>{' '}
        microcontroller, <span className="yellow">DHT22</span>{' '}
        temperature\humidity sensor and <span className="yellow">YL-83</span>{' '}
        rain sensor. This shit also connected with{' '}
        <span className="yellow">Firebase</span>. Data from cloud is fetched and
        displayed for <span className="you">you</span>.
      </span>
    </div>
  );
};

export default IntroInfo;
