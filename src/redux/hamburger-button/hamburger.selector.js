import { createSelector } from "reselect";

const getMenuStatus = (state) => state.menuStatus;

export const selectIsHidden = createSelector(
  [getMenuStatus],
  (data) => data.isHidden
);
