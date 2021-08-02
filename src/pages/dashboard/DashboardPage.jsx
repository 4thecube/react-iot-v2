import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { createStructuredSelector } from "reselect";
import { FullPage, Slide } from "react-full-page";

//selectors ?
import {
  selectDataFromRainSensor,
  selectFullDate,
  selectHumidity,
  selectMaxHumidity,
  selectMaxTemperature,
  selectMinTemperature,
  selectTemperature,
  selectMinHumidity,
  selectFiveLastElements,
  selectOnlyTodayTemperature,
  selectOnlyTodayHumidity,
  selectTodayDate,
  selectAverageTodayTemperature,
  selectAverageTodayHumidity,
  selectAverageAllDataTemperature,
  selectAverageAllDataHumidity,
} from "../../redux/meteodata/meteodata.selector";

import { selectIsHidden } from "../../redux/hamburger-button/hamburger.selector";
import LinearChart from "../../components/linear-chart/LinearChart";
import MeteodataList from "../../components/meteodata-list/MeteodataList";

import "./DashboardPage.scss";
import TextBlock from "../../components/text-block/TextBlock.component";
import { closeMenu } from "../../redux/hamburger-button/hamburger.action";
import IntroInfo from "../../components/intro-info/IntroInfo.component";
import StatisticalData from "../../components/statistical-data/StatisticalData.component";

const DashboardPage = ({
  temperature,
  humidity,
  date,
  onlyCurrentMonthData,
  fiveLastElements,
  isHidden,
  closeMenu,
  todayTemperature,
  todayHumidity,
  todayDate,
  avgTemperature,
  avgHumidity,
  avgTemp,
  avgHum,
}) => {
  const [selectOption, setSelectOption] = useState("ALL TIME");

  // Can I move this to redux?
  const handleChange = (event) => {
    const { value } = event.target;
    setSelectOption(value);
  };

  return (
    <div
      onClick={closeMenu}
      className={`${isHidden ? "hidden" : "blured"} dashboard-page`}
    >
      <FullPage>
        <Slide>
          <div className="slider-container">
            <IntroInfo />
            <MeteodataList
              size="small-list"
              data={fiveLastElements}
              hasButton
            />
          </div>
        </Slide>
        <Slide>
          <div className="slider-container">
            <div className="chart-and-avg">
              {selectOption === "ALL TIME" ? (
                <LinearChart
                  title="DATA PRESENTATION FOR"
                  color={["#ffc107", "#007bff"]}
                  firstData={{
                    name: "Temperature",
                    data: Object.values(temperature),
                  }}
                  secondData={{
                    name: "Humidity",
                    data: Object.values(humidity),
                  }}
                  maxValue={100}
                  date={date}
                  changeEvent={handleChange}
                />
              ) : selectOption === "TODAY" ? (
                <LinearChart
                  title="DATA PRESENTATION FOR"
                  color={["#ffc107", "#007bff"]}
                  firstData={{
                    name: "Temperature",
                    data: Object.values(todayTemperature),
                  }}
                  secondData={{
                    name: "Humidity",
                    data: Object.values(todayHumidity),
                  }}
                  maxValue={100}
                  date={todayDate}
                  changeEvent={handleChange}
                />
              ) : null}
              <div className="avg-stats">
                <h2 className="avg-title">AVERAGE: {selectOption}</h2>
                <TextBlock
                  customClassName="avg-stat"
                  title="Average temperature"
                  data={selectOption === "TODAY" ? avgTemperature : avgTemp}
                  subtitle="°C"
                />
                <TextBlock
                  customClassName="avg-stat"
                  title="Average humidity"
                  data={selectOption === "TODAY" ? avgHumidity : avgHum}
                  subtitle="%"
                />
              </div>
            </div>
          </div>
        </Slide>
        <Slide>
          <div className="slider-container">
            <StatisticalData />
          </div>
        </Slide>
      </FullPage>
    </div>
  );
};

// TODO: Fix the names u fuck
const mapStateToProps = createStructuredSelector({
  temperature: selectTemperature,
  humidity: selectHumidity,
  rainSensor: selectDataFromRainSensor,
  date: selectFullDate,
  fiveLastElements: selectFiveLastElements,
  isHidden: selectIsHidden,
  todayTemperature: selectOnlyTodayTemperature,
  todayHumidity: selectOnlyTodayHumidity,
  todayDate: selectTodayDate,
  avgTemperature: selectAverageTodayTemperature,
  avgHumidity: selectAverageTodayHumidity,
  avgTemp: selectAverageAllDataTemperature,
  avgHum: selectAverageAllDataHumidity,
});

const mapDispatchToProps = (dispatch) => ({
  closeMenu: () => dispatch(closeMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
