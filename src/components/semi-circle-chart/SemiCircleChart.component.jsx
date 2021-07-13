import React, { useState } from "react";
import Chart from "react-apexcharts";

import "./SemiCircleChart.styles.scss";

const SemiCircleChart = ({ series }) => {
  console.log(series);
  const [options, setOptions] = useState({
    // series: Object.values(series),
    // options: {
    //   chart: {
    //     type: "radialBar",
    //     offsetY: -20,
    //   },
    //   plotOptions: {
    //     radialBar: {
    //       startAngle: -90,
    //       endAngle: 90,
    //       dataLabels: {
    //         name: {
    //           show: false,
    //         },
    //         value: {
    //           offsetY: -2,
    //           fontSize: "22px",
    //         },
    //       },
    //     },
    //   },
    //   grid: {
    //     padding: {
    //       top: -10,
    //     },
    //   },
    // },
    // labels: ["Avg"],
    series: Object.values(series),
    options: {
      chart: {
        type: "radialBar",
        height: 320,
        offsetY: -30,
        offsetX: 20,
      },
      plotOptions: {
        radialBar: {
          size: undefined,
          inverseOrder: false,
          hollow: {
            margin: 5,
            size: "48%",
            background: "transparent",
          },
          track: {
            show: true,
            background: "#40475D",
            strokeWidth: "10%",
            opacity: 1,
            margin: 3, // margin is in pixels
          },
        },
      },
      labels: ["Device 1", "Device 2"],
      legend: {
        show: true,
        position: "left",
        offsetX: -30,
        offsetY: 10,
        formatter: function (val, opts) {
          return val + " - " + opts.w.globals.series[opts.seriesIndex] + "%";
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
    },
  });
  return (
    <div className="sm-col-chart">
      <span className="title">{Object.keys(series)}</span>
      <Chart
        width="500"
        type="radialBar"
        options={options.options}
        series={options.series}
      />
    </div>
  );
};

export default SemiCircleChart;
