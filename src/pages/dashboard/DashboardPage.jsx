import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { FullPage, Slide } from "react-full-page";

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
  selectOnlyCurrentMonthData,
  selectAveragePerCurrentMonth,
} from "../../redux/meteodata/meteodata.selector";
import { selectIsHidden } from "../../redux/hamburger-button/hamburger.selector";
import LinearChart from "../../components/linear-chart/LinearChart";
import MeteodataList from "../../components/meteodata-list/MeteodataList";

import "./DashboardPage.scss";
import TextBlock from "../../components/text-block/TextBlock.component";
import ColumnChart from "../../components/column-chart/ColumnChart.component";
import { closeMenu } from "../../redux/hamburger-button/hamburger.action";
import IntroInfo from "../../components/intro-info/IntroInfo.component";
import SemiCircleChart from "../../components/semi-circle-chart/SemiCircleChart.component";
import Loader from "../../components/loader/Loader.component";

const DashboardPage = ({
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
  avg,
}) => {
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
            <LinearChart
              title="Temperature"
              color={["#ffc107", "#007bff"]}
              firstData={{
                name: "Temperature",
                data: Object.values(temperature),
              }}
              secondData={{ name: "Humidity", data: Object.values(humidity) }}
              maxValue={100}
              date={date}
            />
            <div className="sm-col-charts">
              {avg.map((dt) =>
                isNaN(Object.values(dt)) ? (
                  <Loader />
                ) : (
                  <SemiCircleChart series={dt} />
                )
              )}
            </div>
          </div>
        </Slide>
        <Slide>
          <div className="slider-container">
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
                title="In this month we get"
                data={onlyCurrentMonthData.length}
                subtitle=" record(s)"
              />
            </div>
          </div>
        </Slide>
      </FullPage>
    </div>
  );
};

// TODO: Fix the names u fuck
const mapStateToProps = (state) =>
  createStructuredSelector({
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
    avg: selectAveragePerCurrentMonth,
  });

const mapDispatchToProps = (dispatch) => ({
  closeMenu: () => dispatch(closeMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
