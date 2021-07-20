import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { createStructuredSelector } from "reselect";
import { FullPage, Slide } from "react-full-page";

import {
  selectAllData,
  selectDataFromRainSensor,
  selectFullDate,
  selectHumidity,
  selectMaxHumidity,
  selectMaxTemperature,
  selectMinTemperature,
  selectTemperature,
  selectMinHumidity,
  selectFiveLastElements,
  selectOnlyCurrentMonthData,
  selectHowManyDaysGoneWhenLastElementWasAdded,
  selectOnlyTodayTemperature,
  selectOnlyTodayHumidity,
  selectTodayDate,
  selectAverageTodayTemperature,
  selectAverageTodayHumidity,
  selectAverageAllDataTemperature,
  selectAverageAllDataHumidity,
  selectCountOfRainingDays,
} from "../../redux/meteodata/meteodata.selector";

import { selectIsHidden } from "../../redux/hamburger-button/hamburger.selector";
import LinearChart from "../../components/linear-chart/LinearChart";
import MeteodataList from "../../components/meteodata-list/MeteodataList";

import "./DashboardPage.scss";
import TextBlock from "../../components/text-block/TextBlock.component";
import ColumnChart from "../../components/column-chart/ColumnChart.component";
import { closeMenu } from "../../redux/hamburger-button/hamburger.action";
import IntroInfo from "../../components/intro-info/IntroInfo.component";
import Loader from "../../components/loader/Loader.component";

const DashboardPage = ({
  allData,
  temperature,
  humidity,
  date,
  maxTemp,
  minTemperature,
  maxHumidity,
  minHumidity,
  onlyCurrentMonthData,
  fiveLastElements,
  isHidden,
  closeMenu,
  daysCount,
  todayTemperature,
  todayHumidity,
  todayDate,
  avgTemperature,
  avgHumidity,
  avgTemp,
  avgHum,
  howManyDaysRaining,
}) => {
  const [selectOption, setSelectOption] = useState("ALL TIME");

  // Can I move this to redux?
  const handleChange = (event) => {
    const { value } = event.target;
    setSelectOption(value);
  };

  console.log();

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
              <div className="select-container">
                <select
                  aria-label="selectOption"
                  onChange={handleChange}
                  className="select"
                >
                  <option value="ALL TIME">ALL TIME</option>
                  <option value="TODAY">TODAY</option>
                </select>
              </div>
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
            <div className="stats-title">
              <p>STATISTICAL DATA</p>
            </div>
            <div className="text-blocks">
              <TextBlock
                title="Highest temperature"
                data={maxTemp}
                subtitle="°C"
              />
              <TextBlock
                title="Lowest temperature"
                data={minTemperature}
                subtitle="°C"
              />
              <TextBlock
                title="Highest humidity"
                data={maxHumidity}
                subtitle="%"
              />
              <TextBlock
                title="Lowest humidity"
                data={minHumidity}
                subtitle="%"
              />
              <TextBlock
                title="Total record"
                data={allData.length}
                subtitle=" record(s)"
              />
              <TextBlock
                title="In this month we get"
                data={onlyCurrentMonthData.length}
                subtitle=" record(s)"
              />
              <TextBlock title="RAINING DAYS" data={howManyDaysRaining} />
              {daysCount && (
                <TextBlock
                  title="Last record written"
                  data={daysCount.dayStamp}
                  subtitle=""
                  special
                />
              )}
            </div>
          </div>
        </Slide>
      </FullPage>
    </div>
  );
};

// TODO: Fix the names u fuck
const mapStateToProps = createStructuredSelector({
  temperature: selectTemperature,
  maxTemp: selectMaxTemperature,
  minTemperature: selectMinTemperature,
  humidity: selectHumidity,
  maxHumidity: selectMaxHumidity,
  minHumidity: selectMinHumidity,
  rainSensor: selectDataFromRainSensor,
  date: selectFullDate,
  fiveLastElements: selectFiveLastElements,
  onlyCurrentMonthData: selectOnlyCurrentMonthData,
  isHidden: selectIsHidden,
  allData: selectAllData,
  daysCount: selectHowManyDaysGoneWhenLastElementWasAdded,
  todayTemperature: selectOnlyTodayTemperature,
  todayHumidity: selectOnlyTodayHumidity,
  todayDate: selectTodayDate,
  avgTemperature: selectAverageTodayTemperature,
  avgHumidity: selectAverageTodayHumidity,
  avgTemp: selectAverageAllDataTemperature,
  avgHum: selectAverageAllDataHumidity,
  howManyDaysRaining: selectCountOfRainingDays,
});

const mapDispatchToProps = (dispatch) => ({
  closeMenu: () => dispatch(closeMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
