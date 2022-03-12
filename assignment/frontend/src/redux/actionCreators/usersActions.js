/** @format */

// USERS ACTION CREATORS

import {
  GET_USER,
  GET_USERS,
  NEW_NOTIFICATION,
  REMOVE_USER,
  UPDATE_USER,
} from "../constants";

import axios from "axios";
//Use these for the notifications sent.
const userMsg = {
  gotUser: "Single user received",
  gotUsers: "Users received",
  updateUser: "User updated.",
  delete: (user) => {
    return `${user.name} deleted successfully`;
  },
};

/**
 * @description Asynchronous action creator that gets a single user from the backend (if possible) and sends that through thunk to the reducers.
 * If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends notification state along with the error message from db as an unsuccessfull message.
 *
 * @param {String} userId - The users id that is to be fetched.
 * @returns {Function} - For the thunk to then dispatch as an object (ie the action).
 */
export const getUser = (userId) => {
  return async (dispatch) => {
    const res = await axios.get(`/api/users/${userId}`);

    if (res.status === 200) {
      dispatch({
        type: GET_USER,
        payload: res.data,
      });
      dispatch({
        type: NEW_NOTIFICATION,
        payload: {message: userMsg.gotUser, isSuccess: true},
      });
    } else {
      dispatch({
        type: NEW_NOTIFICATION,
        payload: {message: res.data.error, isSuccess: false},
      });
    }
  };
};
/**
 * @description Asynchronous action creator that gets all the users from the backend (if possible) and sends that Array through thunk to the reducers.
 * If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends notification state along with the error message from db as an unsuccessfull message.
 *
 * @returns {Function} - For the thunk to then dispatch as an object (ie the action).
 */
export const getUsers = () => {
  return async (dispatch) => {
    const res = await axios.get("/api/users");

    if (res.status === 200) {
      dispatch({
        type: GET_USERS,
        payload: res.data,
      });
      dispatch({
        type: NEW_NOTIFICATION,
        payload: {message: userMsg.gotUsers, isSuccess: true},
      });
    } else {
      dispatch({
        type: NEW_NOTIFICATION,
        payload: {message: res.data.error, isSuccess: false},
      });
    }
  };
};
/**
 * @description Asynchronous action creator that updates the given user (if possible) and sends the user received from the backend through thunk to reducers.
 * If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends notification state along with the error message from db as an unsuccessfull message.
 *
 * @param {object} updatedUser - contains the updated user data
 * @returns {Function} - For the thunk to then dispatch as an object (ie the action).
 */
export const updateUser = (updatedUser) => {
  return async (dispatch) => {
    const res = await axios.put(`/api/users/${updateUser.id}`, updatedUser);

    if (res.status === 200) {
      dispatch({
        type: UPDATE_USER,
        payload: res.data,
      });

      dispatch({
        type: NEW_NOTIFICATION,
        payload: {message: userMsg.updateUser, isSuccess: true},
      });
    } else {
      dispatch({
        type: NEW_NOTIFICATION,
        payload: {message: res.data.error, isSuccess: false},
      });
    }
  };
};
/**
 * @description Removes the user (if possible) from the backend, then dispatches an action to remove it from the redux-store, as well as another action to notify the current user that the deletion was succesfull.
 * If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends notification state along with the error message from db as an unsuccessfull message.
 *
 * @param {String} - The users id that is to be fetched
 * @returns {Function} - For the thunk to then dispatch as an object (ie the action).
 */
export const removeUser = (userId) => {
  return async (dispatch) => {
    const res = await axios.delete(`/api/users/${userId}`);

    if (res.status === 200) {
      dispatch({
        type: REMOVE_USER,
        payload: res.data,
      });
      dispatch({
        type: NEW_NOTIFICATION,
        payload: {message: userMsg.delete(res.data), isSuccess: true},
      });
    } else {
      dispatch({
        type: NEW_NOTIFICATION,
        payload: {message: res.data.error, isSuccess: false},
      });
    }
  };
};
