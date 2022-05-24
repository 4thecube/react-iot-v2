import { createSelector } from 'reselect';
import _, { create } from 'lodash';

const meteodataSelector = (state) => state.data.fetchedData || [];

export const selectAllData = createSelector(
  [meteodataSelector],
  (data) => data
);

export const selectAllDataReversed = createSelector(
  [meteodataSelector],
  (data) => _.reverse(data)
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
  date.map((dt) => dt.timeStamp + ' ' + dt.dayStamp)
);

export const selectConvertedRainSensorData = createSelector(
  [selectDataFromRainSensor],

  (data) => data.map((dt) => (dt > 1000 ? '0' : '1'))
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
      parseInt(dt.dayStamp.split('-')[1]) === new Date().getMonth() + 1
        ? dt
        : null
    )
);

export const selectCurrentMonthData = createSelector(
  [convertNotCurrentDataToNull],
  (data) => data.filter((dt) => dt !== null)
);

export const selectAveragePerCurrentMonth = createSelector(
  [selectCurrentMonthData],
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

export const selectAverageAllDataTemperature = createSelector(
  [selectAllData],
  (data) =>
    parseFloat(
      (_.sum(data.map((dt) => dt.temperature)) / data.length).toFixed(1)
    )
);

export const selectAverageAllDataHumidity = createSelector(
  [selectAllData],
  (data) =>
    parseFloat((_.sum(data.map((dt) => dt.humidity)) / data.length).toFixed(1))
);

//TODO: Change name
export const selectHowManyDaysGoneWhenLastElementWasAdded = createSelector(
  [selectAllData],
  (data) => _.last(data)
);

export const onlyTodayDataHelper = createSelector([selectAllData], (data) =>
  data.filter((dt) =>
    dt.dayStamp.split('-')[2] === new Date(Date.now()).getDate().toString()
      ? dt
      : null
  )
);

export const selectOnlyTodayTemperature = createSelector(
  [onlyTodayDataHelper],
  (data) => data.map((dt) => dt.temperature.toFixed(1))
);

export const selectOnlyTodayHumidity = createSelector(
  [onlyTodayDataHelper],
  (data) => data.map((dt) => dt.humidity.toFixed(1))
);

export const selectTodayDate = createSelector([onlyTodayDataHelper], (data) =>
  data.map((dt) => dt.dayStamp + ' ' + dt.timeStamp)
);

export const selectAverageTodayTemperature = createSelector(
  [selectOnlyTodayTemperature],
  (data) => (_.sum(data.map((dt) => parseFloat(dt))) / data.length).toFixed(1)
);

export const selectAverageTodayHumidity = createSelector(
  [selectOnlyTodayHumidity],
  (data) => (_.sum(data.map((dt) => parseFloat(dt))) / data.length).toFixed(1)
);

export const selectCountOfRainingDays = createSelector(
  [selectAllData],
  (data) =>
    _.uniq(data.filter((dt) => dt.rain < 1000).map((dt) => dt.dayStamp)).length
);

export const selectLengthOfAllRecords = createSelector(
  [selectAllData],
  (data) => data.length
);

export const selectLengthOfMonthRecords = createSelector(
  [selectCurrentMonthData],
  (data) => data.length.toString()
);
