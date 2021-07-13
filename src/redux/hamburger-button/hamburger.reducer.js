const INITIAL_STATE = {
  isHidden: true,
};

export const hamburgerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "TOGGLE_IS_HIDDEN":
      return {
        ...state,
        isHidden: !state.isHidden,
      };
    case "CLOSE_MENU":
      return {
        ...state,
        isHidden: true,
      };
    default:
      return state;
  }
};
