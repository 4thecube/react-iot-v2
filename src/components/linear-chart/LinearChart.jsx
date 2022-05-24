import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

import './LinearChart.styles.scss';

const LinearChart = ({
  date,
  firstData,
  secondData,
  title,
  color,
  maxValue,
  changeEvent,
}) => {
  const [chartOptions, setChartOptions] = useState({
    options: {
      chart: {
        id: 'basic-bar',
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
        curve: 'smooth',
      },
      colors: color,
    },
    title: {
      text: 'Meteodata',
      align: 'left',
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
      { name: 'Fuck you', data: [0, 0, 0] },
      { name: 'And you', data: [0, 0, 0] },
    ],
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      offsetY: -20,
    },
  });

  useEffect(() => {
    setChartOptions({
      options: {
        chart: {
          id: 'basic-bar',
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
          curve: 'smooth',
          width: 5,
        },
        colors: color,
        title: {
          text: 'Meteodata',
          align: 'left',
          offsetY: 0,
          offsetX: 20,
        },

        grid: {
          show: true,
          padding: {
            bottom: 0,
          },
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          offsetY: 0,
          color: 'white',
        },
      },
      series: [firstData, secondData],
    });
  }, [date, firstData, secondData, color, maxValue]);

  return (
    <div className="custom-chart">
      <div className="chart-title">
        <h1>{title}</h1>
        <div className="select-container">
          <select
            aria-label="selectOption"
            onChange={changeEvent}
            className="select"
          >
            <option value="ALL TIME">ALL TIME</option>
            <option value="TODAY">TODAY</option>
          </select>
        </div>
      </div>
      {date && firstData && secondData ? (
        firstData.data.length ? (
          <Chart
            options={chartOptions.options}
            series={chartOptions.series}
            type="line"
            width="100%"
          />
        ) : (
          <div className="chart-error">No data for presentation</div>
        )
      ) : null}
    </div>
  );
};

export default LinearChart;
