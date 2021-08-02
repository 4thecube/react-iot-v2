import { SelectOptionTypes } from "./selectOption.types";

const INITIAL_STATE = "ALL DATA";

export const selectOptionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SelectOptionTypes.SELECT_ALL_DATA_REPRESENTATION:
      return {
        ...state,
        selectOption: action.payload,
      };
    case SelectOptionTypes.SELECT_TODAY_DATA_REPRESENTATION:
      return {
        ...state,
        selectOption: action.payload,
      };
    default:
      return state;
  }
};
