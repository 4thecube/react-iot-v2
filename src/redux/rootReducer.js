import { combineReducers } from 'redux';

import { hamburgerReducer } from './hamburger-button/hamburger.reducer';
import { meteodataReducer } from './meteodata/meteodata.reducer';

export default combineReducers({
  data: meteodataReducer,
  menuStatus: hamburgerReducer,
});
