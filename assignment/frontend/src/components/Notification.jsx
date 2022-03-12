/** @format */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeNotification } from "../redux/actionCreators/notificationsActions";

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => {
    console.log("notification state", state);
    return state.notification;
  });

  setTimeout(() => {
    dispatch(removeNotification());
  }, 5000);

  let notificationElement = <div data-testid="no-notification-component"></div>;

  if (Object.keys(notification).length > 0) {
    notificationElement = (
      <div
        data-testid="notification-component"
        style={{ backgroundColor: notification.isSuccess ? "green" : "red" }}
      >
        {notification.message}
      </div>
    );
  }

  return notificationElement;
};

export default Notification;
