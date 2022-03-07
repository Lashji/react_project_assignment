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

  let notificationElement = <div data-testid="no-notification-component"></div>;
  if (Object.keys(notification).length > 0) {
    notificationElement = (
      <div
        data-testid="notification-component"
        style={{ backgroundColor: notification.isSucces ? "green" : "red" }}
      >
        {notification.message}
      </div>
    );

    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  }

  return notificationElement;
};

export default Notification;
