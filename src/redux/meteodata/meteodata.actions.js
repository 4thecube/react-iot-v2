import { MeteodataActionTypes } from "./meteodata.types";

export const fetchDataAsync = (db) => {
  return (dispatch) =>
    db
      .database()
      .ref("/")
      .on("value", (snapshot) => {
        dispatch({
          type: MeteodataActionTypes.FETCH_DATA,
          payload: snapshot.val(),
        });
      });
};
