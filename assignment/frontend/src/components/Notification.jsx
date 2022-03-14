/** @format */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeNotification } from "../redux/actionCreators/notificationsActions";

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => {
    return state.notification;
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log("set new timeout");
      dispatch(removeNotification());
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  let notificationElement = <div data-testid="no-notification-component"></div>;
  console.log("Notification ", notification);
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
