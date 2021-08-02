import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import TextBlock from "../text-block/TextBlock.component";

//selectors ?
import {
  selectAllData,
  selectMaxHumidity,
  selectMaxTemperature,
  selectMinHumidity,
  selectMinTemperature,
  selectLengthOfAllRecords,
  selectLengthOfMonthRecords,
  selectHowManyDaysGoneWhenLastElementWasAdded,
  selectCountOfRainingDays,
} from "../../redux/meteodata/meteodata.selector";

const StatisticalData = ({
  lowestTemperature,
  highestTemperature,
  lowestHumidity,
  highestHumidity,
  recordsLength,
  monthRecordsLength,
  daysCount,
  howManyDaysRaining,
}) => {
  return (
    <>
      <div className="stats-title">
        <p>STATISTICAL DATA</p>
      </div>
      <div className="text-blocks">
        <TextBlock
          title="Highest temperature"
          data={highestTemperature}
          subtitle="°C"
        />
        <TextBlock
          title="Lowest temperature"
          data={lowestTemperature}
          subtitle="°C"
        />
        <TextBlock
          title="Highest humidity"
          data={highestHumidity}
          subtitle="%"
        />
        <TextBlock title="Lowest humidity" data={lowestHumidity} subtitle="%" />
        <TextBlock
          title="Total record"
          data={recordsLength}
          subtitle=" record(s)"
        />
        <TextBlock
          title="In this month we get"
          // move to selectors
          data={monthRecordsLength}
          subtitle=" record(s)"
        />
        <TextBlock title="RAINING DAYS" data={howManyDaysRaining} />
        {daysCount && (
          <TextBlock
            subtitle
            title="Last record written"
            data={daysCount.dayStamp}
            special
          />
        )}
      </div>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  recordsLength: selectLengthOfAllRecords,
  monthRecordsLength: selectLengthOfMonthRecords,
  lowestTemperature: selectMinTemperature,
  highestTemperature: selectMaxTemperature,
  lowestHumidity: selectMinHumidity,
  highestHumidity: selectMaxHumidity,
  daysCount: selectHowManyDaysGoneWhenLastElementWasAdded,
  howManyDaysRaining: selectCountOfRainingDays,
});

export default connect(mapStateToProps)(StatisticalData);
