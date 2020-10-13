const initialState = "";
let lastTimeout = null;

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.notification;
    case "CLEAR_NOTIFICATION":
      return "";
    default:
      return state;
  }
};

const clearNotification = () => {
  return {
    type: "CLEAR_NOTIFICATION"
  };
};
export const createNotification = (notification, timeout) => {
  return async dispatch => {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    dispatch({type: "SET_NOTIFICATION", notification});
    lastTimeout = setTimeout(() => {
      dispatch(clearNotification());
      lastTimeout = null;
    }, timeout * 1000);
  };
};

export default notificationReducer;
