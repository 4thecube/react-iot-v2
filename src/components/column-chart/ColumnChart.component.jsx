import React, { useState, useEffect } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import Chart from "react-apexcharts";
import _ from "lodash";

import {
  selectFullDate,
  selectSumWhenWasRaining,
  selectConvertedRainSensorData,
  selectSumWhenWeatherWasDry,
} from "../../redux/meteodata/meteodata.selector";

import "./ColumnChart.styles.scss";

const ColumnChart = ({ date, data, sum, sumDry }) => {
  const [options, setOptions] = useState(null);

  useEffect(() => {
    setOptions({
      options: {
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: date,
          labels: {
            show: false,
          },
        },
        yaxis: {
          show: false,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded",
          },
        },
        tooltip: {
          y: {
            formatter: function (val) {
              if (val === 1) return "Was raining";
              if (val === 0.2) return "Dry";
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
      },

      series: [
        {
          name: "Rain status",
          data,
        },
      ],
    });
  }, [date, data]);
  return (
    <>
      {options ? (
        <Chart
          className="column-chart"
          options={options.options}
          series={options.series}
          type="bar"
          width="500"
        />
      ) : (
        <h2>Loading...</h2>
      )}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  date: selectFullDate,
  data: selectConvertedRainSensorData,
  sum: selectSumWhenWasRaining,
  sumDry: selectSumWhenWeatherWasDry,
});

export default connect(mapStateToProps)(ColumnChart);
