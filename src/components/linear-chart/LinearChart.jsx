import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

import "./LinearChart.styles.scss";

const LinearChart = ({
  date,
  firstData,
  secondData,
  title,
  color,
  maxValue,
}) => {
  const [chartOptions, setChartOptions] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: date,
      },
      yaxis: {
        min: 0,
        max: maxValue,
        tickAmount: 5,
      },
      stroke: {
        curve: "smooth",
      },
      colors: color,
    },
    title: {
      text: "Meteodata",
      align: "left",
      offsetY: 25,
      offsetX: 20,
    },
    markers: {
      size: 6,
      strokeWidth: 0,
      hover: {
        size: 9,
      },
    },
    grid: {
      show: true,
      padding: {
        bottom: 0,
      },
    },
    series: [
      { name: "Fuck you", data: [0, 0, 0] },
      { name: "And you", data: [0, 0, 0] },
    ],
    legend: {
      position: "top",
      horizontalAlign: "right",
      offsetY: -20,
    },
  });

  useEffect(() => {
    setChartOptions({
      options: {
        chart: {
          id: "basic-bar",
          dropShadow: {
            enabled: true,
            top: 3,
            left: 2,
            blur: 4,
            opacity: 1,
          },
        },
        xaxis: {
          categories: date,
          labels: {
            show: false,
          },
        },
        yaxis: {
          min: 0,
          max: maxValue,
          tickAmount: 5,
        },
        stroke: {
          curve: "smooth",
          width: 3,
        },
        colors: color,
        title: {
          text: "Meteodata",
          align: "left",
          offsetY: 0,
          offsetX: 20,
        },
        markers: {
          size: 5,
          strokeWidth: 0,
          hover: {
            size: 9,
          },
        },
        grid: {
          show: true,
          padding: {
            bottom: 0,
          },
        },
        legend: {
          position: "top",
          horizontalAlign: "right",
          offsetY: 0,
          color: "white",
        },
      },

      // series: [
      //   {
      //     name: nameForChart,
      //     data: data,
      //   },
      // ],
      // series: dataSeries,
      series: [firstData, secondData],
    });
  }, [date, firstData, secondData, color, maxValue]);

  return (
    <div className="custom-chart">
      <h1 className="title">{title}</h1>{" "}
      {date && firstData && secondData ? (
        <Chart
          options={chartOptions.options}
          series={chartOptions.series}
          type="line"
          width="100%"
        />
      ) : null}
    </div>
  );
};

export default LinearChart;
