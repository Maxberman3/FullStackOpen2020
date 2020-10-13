const filterReducer = (
  state = "Attention: This is important information",
  action
) => {
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
    dispatch({type: "SET_NOTIFICATION", notification});
    setTimeout(() => {
      dispatch(clearNotification());
    }, timeout * 1000);
  };
};

export default filterReducer;
