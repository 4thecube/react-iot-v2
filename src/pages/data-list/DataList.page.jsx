import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectAllDataReversed } from "../../redux/meteodata/meteodata.selector";
import { selectIsHidden } from "../../redux/hamburger-button/hamburger.selector";
import MeteodataList from "../../components/meteodata-list/MeteodataList";

import "./DataList.page.styles.scss";

const DataList = ({ data, isHidden }) => {
  return (
    <div className={`${isHidden ? "" : "blured"} data-list-page`}>
      <MeteodataList size="big-list" data={data} hasButton={false} />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  data: selectAllDataReversed,
  isHidden: selectIsHidden,
});

export default connect(mapStateToProps)(DataList);
