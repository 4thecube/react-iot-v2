import { MeteodataActionTypes } from "./meteodata.types";

export const meteodataReducer = (state = [], action) => {
  switch (action.type) {
    case MeteodataActionTypes.FETCH_DATA:
      return {
        ...state,
        fetchedData: Object.values(action.payload),
      };
    default:
      return state;
  }
};
