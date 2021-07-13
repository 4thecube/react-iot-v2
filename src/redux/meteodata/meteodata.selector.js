import { createSelector } from "reselect";
import _ from "lodash";

const meteodataSelector = (state) => state.data.fetchedData || [];

export const selectAllData = createSelector(
  [meteodataSelector],
  (data) => data
);

export const selectTemperature = createSelector([meteodataSelector], (data) =>
  data.map((dt) => parseFloat(dt.temperature.toFixed(2)))
);

export const selectHumidity = createSelector([meteodataSelector], (data) =>
  data.map((dt) => Math.floor(dt.humidity))
);

export const selectDataFromRainSensor = createSelector(
  [meteodataSelector],
  (data) => data.map((dt) => dt.rain)
);

export const selectMaxTemperature = createSelector(
  [selectTemperature],
  (data) => _.max(data)
);

export const selectMinTemperature = createSelector(
  [selectTemperature],
  (data) => _.min(data)
);

export const selectMaxHumidity = createSelector([selectHumidity], (data) =>
  _.max(data)
);

export const selectMinHumidity = createSelector([selectHumidity], (data) =>
  _.min(data)
);

export const selectFullDate = createSelector([meteodataSelector], (date) =>
  date.map((dt) => dt.timeStamp + " " + dt.dayStamp)
);

export const selectConvertedRainSensorData = createSelector(
  [selectDataFromRainSensor],

  (data) => data.map((dt) => (dt > 1000 ? "0" : "1"))
);

// export const selectEverySecondDate = createSelector([selectFullDate], (date) =>
//   date.filter((el, idx) => (idx % 2 ? el : null))
// );

export const selectSumWhenWasRaining = createSelector(
  [selectConvertedRainSensorData],
  (data) => _.sum(data.map(Number))
);

export const selectSumWhenWeatherWasDry = createSelector(
  [selectConvertedRainSensorData],
  (data) => data.length - _.sum(data.map(Number))
);

export const selectFiveLastElements = createSelector([selectAllData], (data) =>
  _.reverse(_.takeRight(data, 5))
);

//_.reverse(_.takeRight(data, 5));

export const convertNotCurrentDataToNull = createSelector(
  [selectAllData],
  (data) =>
    data.map((dt) =>
      parseInt(dt.dayStamp.split("-")[1]) === new Date().getMonth() + 1
        ? dt
        : null
    )
);

export const selectOnlyCurrentMonthData = createSelector(
  [convertNotCurrentDataToNull],
  (data) => data.filter((dt) => dt !== null)
);

export const selectAveragePerCurrentMonth = createSelector(
  [selectOnlyCurrentMonthData],
  (data) => [
    {
      temperature: parseFloat(
        (_.sum(data.map((dt) => dt.temperature)) / data.length).toFixed(1)
      ),
    },
    {
      humidity: parseFloat(
        (_.sum(data.map((dt) => dt.humidity)) / data.length).toFixed(1)
      ),
    },
  ]
);