/** @format */

import {
  CLEAR_ORDERS,
  CLEAR_USERS,
  INIT_AUTH,
  NEW_NOTIFICATION,
  REMOVE_AUTH,
} from "../constants";
import { createNotification } from "./notificationsActions";

import axios from "axios";

// Use this regex for email validation
const validEmailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// Invalid Auth Messages:
export const invalidAuth = {
  name: "Name too short",
  email: "Invalid email",
  password: "Password too short",
  passwordMismatch: "Password missmatch",
};

// Valid auth messages.
export const validAuth = {
  welcome: function (name) {
    return `Welcome to my store, ${name}!`;
  },
  welcomeBack: "Welcome back!",
};

//AUTH (THUNK) ACTION CREATORS
/**
 *
 * @description Asynchronous thunk that uses backends /api/check-status path to check whether or not there is the correct browser-cookie and whether or not that browser-cookie is valid. If it's succesful, Dispatches
 * 1) INIT_AUTH with user as payload.
 * If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends notification state along with the error message from db as an unsuccessfull message.
 *
 * @returns {Function} Thunk
 */
export const initAuth = () => {
  return async (dispatch) => {
    const res = await axios.get("/api/check-status");

    if (res.status === 200) {
      dispatch({
        type: INIT_AUTH,
        payload: res.data,
      });
    } else {
      dispatch({
        type: NEW_NOTIFICATION,
        payload: res.data.error,
      });
    }
  };
};
/**
 * @description Asynchronous thunk that handles validation for logInCreds (check Login and Registration validation from assignment instructions). Expects for a successful login-response from server, before dispatches
 * 1) INIT_AUTH with user as payload
 * 2) succesfull notification with validAuth.welcomeBack as message.
 * If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends notification state along with the error message from db as an unsuccessfull notification.
 * @param {Object} logInCreds - The credentials used to login, contains username and password
 * @returns {Function} action
 */
export const logIn = (logInCreds) => {
  return async (dispatch) => {
    if (validate(dispatch, logInCreds)) {
      const res = await axios.post("/api/login", logInCreds);

      if (res.status === 200) {
        dispatch({
          type: INIT_AUTH,
          payload: res.data,
        });

        dispatch({
          type: NEW_NOTIFICATION,
          payload: validAuth.welcomeBack,
        });
      } else {
        dispatch({
          type: NEW_NOTIFICATION,
          payload: res.data.error,
        });
      }
    }
  };
};

/**
 * @description Asynchronous thunk that awaits for a successful logout-response from server, before dispatches
 * the actions with types of
 * 1) REMOVE_AUTH,
 * 2) CLEAR_ORDERS and
 * 3) CLEAR_USERS as well as
 * 4) NEW_NOTIFICATION with succesfull message from the backend as payload to the reducers.
 * @returns {Function}
 */
export const logOut = () => {
  return async (dispatch) => {
    const res = await axios.get("/api/logout");

    if (res.status === 200) {
      dispatch({
        type: REMOVE_AUTH,
      });
      dispatch({
        type: CLEAR_ORDERS,
      });
      dispatch({
        type: CLEAR_USERS,
      });
      dispatch({
        type: NEW_NOTIFICATION,
        payload: res.data,
      });
    }
  };
};

/**
 * @description Asynchronous thunk that handles registeration events. Handles validation for registerCreds (check Login and Registration validation from assignment instructions). If the response is ok, Dispatches
 * 1) an INIT_AUTH-type action to reducers with the received user as payload.
 * 2) a successful NEW_NOTIFICATION-type action to reducers with validAuth.welcome(name) as message.
 * If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends notification state along with the error message from db as an unsuccessfull notification. If the error itself is an object, then it should pass whatever is inside the object.
 * @param registerCreds - The data of the user
 * @returns {Function}
 */
export const register = (registerCreds) => {
  return async (dispatch) => {
    if (validate(dispatch, registerCreds)) {
      const res = await axios.post("/api/register", registerCreds);

      if (res.status === 200) {
        dispatch({
          type: INIT_AUTH,
          payload: res.data,
        });

        dispatch({
          type: NEW_NOTIFICATION,
          payload: validAuth.welcome(res.data.name),
        });
      } else {
        dispatch({
          type: NEW_NOTIFICATION,
          payload: res.data.error,
        });
      }
    }
  };
};

const validate = (dispatch, creds) => {
  return true;
};
